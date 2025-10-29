import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;

    // Check if reservation already exists for the same date and time
    const existingReservation = await Reservation.findOne({
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingReservation) {
      return res.status(400).json({ 
        message: 'This time slot is already reserved. Please choose another time.' 
      });
    }

    const reservation = new Reservation({
      userId: req.user?.userId || null,
      name,
      email,
      phone,
      date: new Date(date),
      time,
      guests,
      specialRequests: specialRequests || ''
    });

    await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const query = req.user.role === 'admin' 
      ? {} 
      : { userId: req.user.userId };
    
    const reservations = await Reservation.find(query)
      .populate('userId', 'name email')
      .sort({ date: 1, time: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('userId', 'name email');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if user owns the reservation or is admin
    if (req.user.role !== 'admin' && reservation.userId?._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation status updated successfully', reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


