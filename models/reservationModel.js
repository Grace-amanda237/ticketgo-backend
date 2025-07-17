const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Trip = require('./tripModel');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  seatNumber: { type: DataTypes.INTEGER, allowNull: false },
  passengerType: { type: DataTypes.STRING, allowNull: false }, // adulte, enfant, animal
  luggage: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'en attente' }, // validé ou non
});

// 🔗 Associations
User.hasMany(Reservation);
Reservation.belongsTo(User);

Trip.hasMany(Reservation);
Reservation.belongsTo(Trip);

module.exports = Reservation;
