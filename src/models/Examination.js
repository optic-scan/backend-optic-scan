const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Examination = db.define('examination', {
    examination_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'user_id',
        },
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'user_id',
        },
    },
    examination_date: { type: DataTypes.DATEONLY, allowNull: false },
    eye_pic: { type: DataTypes.STRING(100), allowNull: false },
    complaints: { type: DataTypes.TEXT, allowNull: true },
    diagnosis: { type: DataTypes.TEXT, allowNull: false },
    doctors_note: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('ongoing', 'complete'), allowNull: false },
});

module.exports = Examination;
