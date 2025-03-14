const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    birthdate: DataTypes.DATEONLY,
    role: DataTypes.ENUM('pasien', 'dokter'),
    password: DataTypes.STRING(100),
    refresh_token: DataTypes.STRING,
});

module.exports = User;
