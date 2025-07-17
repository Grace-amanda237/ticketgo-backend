const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  agency: { type: DataTypes.STRING, allowNull: false },
  departureCity: { type: DataTypes.STRING, allowNull: false },
  arrivalCity: { type: DataTypes.STRING, allowNull: false },
  departureDate: { type: DataTypes.DATE, allowNull: false },
  arrivalDate: { type: DataTypes.DATE, allowNull: false },
  seatCount: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Trip;
