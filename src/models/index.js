const Sequelize = require('sequelize');
const db = require('../configs/database');

const User = require('./User');
const Examination = require('./Examination');

User.hasMany(Examination, {
    foreignKey: 'patient_id',
    as: 'patient_examinations',
});
User.hasMany(Examination, {
    foreignKey: 'doctor_id',
    as: 'doctor_examinations',
});

Examination.belongsTo(User, { foreignKey: 'patient_id', as: 'patient' });
Examination.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });

module.exports = {
    Sequelize,
    db,
    User,
    Examination,
};
