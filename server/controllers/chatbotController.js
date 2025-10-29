import OpenAI from 'openai';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';

// Lazy initialize OpenAI client to ensure env vars are loaded
let openai = null;
const getOpenAIClient = () => {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
};

// Helper function to search menu items by name or category
const searchMenuItems = async (query) => {
  const searchTerm = query.toLowerCase().trim();
  
  // Search by name or category
  const menuItems = await MenuItem.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ]
  });

  return menuItems;
};

// Helper function to check if a specific item is available
const checkItemAvailability = async (itemName) => {
  const menuItem = await MenuItem.findOne({
    name: { $regex: itemName, $options: 'i' }
  });
  
  if (!menuItem) {
    return { found: false, available: false, item: null };
  }
  
  return {
    found: true,
    available: menuItem.available !== false,
    item: menuItem
  };
};

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const lowerMessage = message.toLowerCase().trim();

    // Check if user is asking about a specific menu item
    const menuItems = await MenuItem.find({});
    const availableItems = menuItems.filter(item => item.available !== false);
    const unavailableItems = menuItems.filter(item => item.available === false);

    // Try to find menu items mentioned in the message
    const mentionedItems = [];
    for (const item of menuItems) {
      const itemNameLower = item.name.toLowerCase();
      if (lowerMessage.includes(itemNameLower) || lowerMessage.includes(item.category.toLowerCase())) {
        mentionedItems.push(item);
      }
    }

    // Get menu items for context - include ALL items with availability status
    const menuContext = menuItems.map(item => 
      `${item.name} - ${item.category} - ₹${item.price} - ${item.available !== false ? 'Available' : 'Currently Unavailable'}`
    ).join('\n');

    // Get user's recent orders if authenticated
    let orderContext = '';
    if (req.user?.userId) {
      const recentOrders = await Order.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate('items.menuItem');
      
      if (recentOrders.length > 0) {
        orderContext = '\n\nRecent Orders:\n' + recentOrders.map(order => 
          `Order #${order._id} - Status: ${order.status} - Total: ₹${order.total}`
        ).join('\n');
      }
    }

    // Check for specific menu item queries
    if (mentionedItems.length > 0) {
      const availabilityInfo = mentionedItems.map(item => {
        const status = item.available !== false ? 'is available' : 'is currently unavailable';
        return `${item.name} (${item.category}) - ₹${item.price} - ${status}`;
      }).join('\n');

      const response = `Here's what I found:\n\n${availabilityInfo}\n\n${mentionedItems[0].description || ''}\n\nWould you like to know more about any of these items or place an order?`;
      
      return res.json({
        response: response,
        timestamp: new Date().toISOString()
      });
    }

    // Try to use OpenAI if available
    try {
      const systemPrompt = `You are a helpful AI assistant for "Aha..Bojanam" restaurant. 
You can help customers with:
- Menu recommendations
- Order tracking
- General questions about the restaurant
- Delivery information

IMPORTANT: Always verify menu items and their availability status before responding.

Menu Items (Total: ${menuItems.length}, Available: ${availableItems.length}):
${menuContext}
${orderContext}

When discussing menu items:
- Always mention if an item is available or unavailable
- Provide accurate prices
- Mention the category
- If asked about a specific item, verify its availability status

Be friendly, concise, and helpful. If asked about menu items, recommend based on categories and availability.
If asked about orders, check the recent orders context above.
For delivery zones, mention we deliver across India.`;

      const openaiClient = getOpenAIClient();
      
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const botResponse = completion.choices[0].message.content;

      return res.json({
        response: botResponse,
        timestamp: new Date().toISOString()
      });
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      // Fall through to fallback response
    }

    // Fallback response - query database for better responses
    const fallbackResponse = await getFallbackResponse(message, menuItems, availableItems);
    
    return res.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      note: 'Using fallback response'
    });
  } catch (error) {
    console.error('Chatbot Error:', error);
    
    // Last resort fallback
    const fallbackResponse = await getFallbackResponse(req.body.message || '', [], []);
    
    return res.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      note: 'Using fallback response due to error'
    });
  }
};

// Helper function for fallback responses that queries database
const getFallbackResponse = async (message, menuItems = [], availableItems = []) => {
  if (!message) {
    return 'Hello! I\'m here to help you with menu items, orders, and general questions about Aha..Bojanam restaurant. How can I assist you today?';
  }

  const lowerMessage = message.toLowerCase().trim();

  // Check for menu item queries
  if (menuItems.length > 0) {
    // Search for specific menu items
    const searchResults = await searchMenuItems(message);
    
    if (searchResults.length > 0) {
      const itemsList = searchResults.slice(0, 5).map(item => {
        const status = item.available !== false ? 'Available' : 'Currently Unavailable';
        return `• ${item.name} (${item.category}) - ₹${item.price} - ${status}`;
      }).join('\n');
      
      return `I found these items:\n\n${itemsList}\n\n${searchResults.length > 5 ? `...and ${searchResults.length - 5} more items. ` : ''}Would you like more details about any specific item?`;
    }
  }

  // Category-based responses
  if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dishes') || lowerMessage.includes('items')) {
    if (availableItems.length === 0) {
      return 'I\'m currently unable to fetch our menu. Please check our menu page for all available items!';
    }
    
    // Group by category
    const categories = {};
    availableItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });

    const categoryList = Object.keys(categories).map(cat => 
      `• ${cat} (${categories[cat].length} items)`
    ).join('\n');

    return `We have a great selection of dishes available:\n\n${categoryList}\n\nTotal: ${availableItems.length} items available\n\nWould you like to know more about a specific category or item?`;
  }

  // Availability check
  if (lowerMessage.includes('available') || lowerMessage.includes('in stock') || lowerMessage.includes('have')) {
    if (availableItems.length === 0) {
      return 'I\'m currently unable to check availability. Please check our menu page or contact us directly!';
    }
    
    return `We currently have ${availableItems.length} items available. Would you like to know about a specific item or category?`;
  }

  // Order tracking
  if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('my order')) {
    return 'To track your order, please check your order history in the Cart Items section. If you need immediate assistance, please contact us directly!';
  }

  // Delivery queries
  if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver') || lowerMessage.includes('zone')) {
    return 'We deliver across India! Check our Delivery Zones page for specific areas and delivery fees. For more details, please visit our Delivery Zones section.';
  }

  // Price queries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    if (menuItems.length > 0) {
      const prices = menuItems.map(item => item.price);
      const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      return `Our menu items range from ₹${minPrice} to ₹${maxPrice}, with an average price of ₹${Math.round(avgPrice)}. Would you like to know the price of a specific item?`;
    } else {
      return 'I\'m currently unable to fetch pricing information. Please check our menu page for item prices!';
    }
  }

  // Greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'Hello! Welcome to Aha..Bojanam! I can help you with:\n• Menu items and availability\n• Order information\n• Delivery details\n• General questions\n\nHow can I assist you today?';
  }

  // Default response
  return `Thank you for contacting Aha..Bojanam! I can help you with menu items, availability, orders, and delivery information. Could you please be more specific about what you'd like to know?`;
};

