const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('pasien', 'dokter'),
        allowNull: false,
    },
    profile_pic: {
        type: DataTypes.STRING(100),
        defaultValue: null, // ini nanti ubah pake foto profil default kalau user belom upload
    },
    refresh_token: DataTypes.STRING,
});

module.exports = User;
