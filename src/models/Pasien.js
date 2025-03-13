const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Pasien = db.define('pasien', {
    pasien_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    birthdate: DataTypes.DATEONLY,
    password: DataTypes.STRING(100),
    refresh_token: DataTypes.STRING,
});

module.exports = Pasien;
