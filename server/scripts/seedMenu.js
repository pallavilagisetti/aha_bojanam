import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';

dotenv.config();

const menuItems = [
  // Special Burgers
  { name: 'Classic Cheeseburger', category: 'Special Burgers', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', description: 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and special sauce' },
  { name: 'Bacon Deluxe Burger', category: 'Special Burgers', price: 15.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop', description: 'Premium beef patty with crispy bacon, cheese, onion rings, and BBQ sauce' },
  { name: 'Mushroom Swiss Burger', category: 'Special Burgers', price: 14.99, image: 'https://images.unsplash.com/photo-1520087619250-584c0cbd35f8?w=400&h=300&fit=crop', description: 'Beef patty topped with sautéed mushrooms and Swiss cheese' },
  { name: 'BBQ Ranch Burger', category: 'Special Burgers', price: 13.99, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', description: 'Smoky BBQ sauce, ranch dressing, crispy onions, and pickles' },
  
  // Chicken Burgers
  { name: 'Crispy Chicken Burger', category: 'Chicken Burgers', price: 11.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop', description: 'Crispy fried chicken breast with lettuce, mayo, and pickles' },
  { name: 'Spicy Chicken Burger', category: 'Chicken Burgers', price: 12.99, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop', description: 'Spicy fried chicken with jalapeños, chipotle sauce, and coleslaw' },
  { name: 'Grilled Chicken Burger', category: 'Chicken Burgers', price: 13.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop', description: 'Juicy grilled chicken breast with avocado, tomato, and herb mayo' },
  
  // Sandwiches
  { name: 'Club Sandwich', category: 'Sandwiches', price: 10.99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Triple-decker with turkey, bacon, lettuce, tomato, and mayo' },
  { name: 'Philly Cheesesteak', category: 'Sandwiches', price: 12.99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Sliced beef with melted cheese, onions, and peppers' },
  { name: 'Turkey BLT', category: 'Sandwiches', price: 9.99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', description: 'Roasted turkey with bacon, lettuce, tomato, and mayo' },
  
  // Desserts
  { name: 'Chocolate Lava Cake', category: 'Desserts', price: 7.99, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop', description: 'Warm chocolate cake with molten center, served with vanilla ice cream' },
  { name: 'New York Cheesecake', category: 'Desserts', price: 6.99, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop', description: 'Classic creamy cheesecake with berry compote' },
  { name: 'Ice Cream Sundae', category: 'Desserts', price: 5.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', description: 'Three scoops of vanilla ice cream with hot fudge, whipped cream, and cherry' },
  
  // Drinks
  { name: 'Fresh Lemonade', category: 'Drinks', price: 3.99, image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2e9b?w=400&h=300&fit=crop', description: 'Freshly squeezed lemons with a hint of mint' },
  { name: 'Strawberry Smoothie', category: 'Drinks', price: 4.99, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', description: 'Blended strawberries with yogurt and honey' },
  { name: 'Iced Coffee', category: 'Drinks', price: 3.49, image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop', description: 'Cold brew coffee served over ice with cream' },
  
  // Rice Varieties
  { name: 'Biryani', category: 'Rice Varieties', price: 14.99, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop', description: 'Fragrant basmati rice cooked with spices, herbs, and tender meat' },
  { name: 'Fried Rice', category: 'Rice Varieties', price: 10.99, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', description: 'Wok-fried rice with vegetables, eggs, and your choice of protein' },
  { name: 'Lemon Rice', category: 'Rice Varieties', price: 8.99, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', description: 'Tangy rice tempered with mustard seeds, curry leaves, and lemon' },
  { name: 'Coconut Rice', category: 'Rice Varieties', price: 9.99, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', description: 'Aromatic rice cooked with coconut milk and spices' },
  
  // Tiffen Items
  { name: 'Idli Sambar', category: 'Tiffen Items', price: 6.99, image: 'https://images.unsplash.com/photo-1604329761667-24d3013071c4?w=400&h=300&fit=crop', description: 'Soft steamed rice cakes served with lentil stew and chutney' },
  { name: 'Dosa', category: 'Tiffen Items', price: 7.99, image: 'https://images.unsplash.com/photo-1615367423051-313005ac5579?w=400&h=300&fit=crop', description: 'Crispy fermented crepe made from rice and lentils' },
  { name: 'Vada', category: 'Tiffen Items', price: 5.99, image: 'https://images.unsplash.com/photo-1615367423051-313005ac5579?w=400&h=300&fit=crop', description: 'Deep-fried savory donut made from lentils, served with chutney' },
  { name: 'Upma', category: 'Tiffen Items', price: 6.49, image: 'https://images.unsplash.com/photo-1615367423051-313005ac5579?w=400&h=300&fit=crop', description: 'Traditional semolina porridge with vegetables and spices' },
  
  // Seafood
  { name: 'Grilled Salmon', category: 'Seafood', price: 18.99, image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop', description: 'Fresh Atlantic salmon grilled to perfection with herbs' },
  { name: 'Fish & Chips', category: 'Seafood', price: 15.99, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop', description: 'Golden fried fish fillets with crispy French fries' },
  { name: 'Shrimp Scampi', category: 'Seafood', price: 17.99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', description: 'Jumbo shrimp sautéed in garlic butter and white wine sauce' },
  { name: 'Lobster Roll', category: 'Seafood', price: 24.99, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop', description: 'Fresh lobster meat in a buttered roll with lemon aioli' },
  
  // Fast Food Snacks
  { name: 'French Fries', category: 'Fast Food Snacks', price: 4.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', description: 'Crispy golden fries served with ketchup' },
  { name: 'Chicken Wings', category: 'Fast Food Snacks', price: 9.99, image: 'https://images.unsplash.com/photo-1527477396000-e27137b3c161?w=400&h=300&fit=crop', description: 'Spicy buffalo wings with blue cheese dip' },
  { name: 'Onion Rings', category: 'Fast Food Snacks', price: 5.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', description: 'Crispy beer-battered onion rings' },
  { name: 'Nachos', category: 'Fast Food Snacks', price: 8.99, image: 'https://images.unsplash.com/photo-1619644498673-c4b2c0d7e7a4?w=400&h=300&fit=crop', description: 'Tortilla chips loaded with cheese, jalapeños, and salsa' },
  
  // Juices
  { name: 'Orange Juice', category: 'Juices', price: 3.99, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', description: 'Freshly squeezed orange juice' },
  { name: 'Apple Juice', category: 'Juices', price: 3.99, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', description: 'Pure apple juice from fresh apples' },
  { name: 'Watermelon Juice', category: 'Juices', price: 4.49, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', description: 'Refreshing watermelon juice with mint' },
  { name: 'Mixed Fruit Juice', category: 'Juices', price: 4.99, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', description: 'Blend of seasonal fresh fruits' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert new menu items
    await MenuItem.insertMany(menuItems);
    console.log(`Successfully seeded ${menuItems.length} menu items`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

