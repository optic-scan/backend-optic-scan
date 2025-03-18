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
            model: 'user',
            key: 'user_id',
        },
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'user_id',
        },
    },
    examination_date: DataTypes.DATEONLY,
    diagnosis: DataTypes.STRING(255),
    note: DataTypes.TEXT(),
    status: DataTypes.ENUM('ongoing', 'complete'),
});

module.exports = Examination;
