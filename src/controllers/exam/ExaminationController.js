const { Op } = require('sequelize');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const { User, Examination } = require('../../models');

const getExamResult = async (req, res) => {
    const user_id = req.user_id;

    try {
        const response = await Examination.findAll({
            where: {
                [Op.or]: [{ patient_id: user_id }, { doctor_id: user_id }],
            },
        });
        res.json({
            message: `Data hasil pemeriksaan berdasarkan user login berhasil diambil`,
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const submitExam = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Gambar mata tidak ditemukan' });
    }

    if (req.role != 'pasien') {
        return res
            .status(403)
            .json({ message: 'Submit foto mata harus seorang pasien' });
    }

    const patientId = req.user_id;
    const { complaints } = req.body;
    const eyePicFilename = req.file.filename;
    const eyePicPath = path.join(
        __dirname,
        '../../../public/images/eye-scans/',
        eyePicFilename
    );

    try {
        const doctors = await User.findAll({
            where: { role: 'dokter' },
        });

        if (doctors.length === 0) {
            return res
                .status(500)
                .json({ message: 'Dokter tidak tersedia saat ini' });
        }

        const randomDoctor =
            doctors[Math.floor(Math.random() * doctors.length)];

        const form = new FormData();
        form.append('file', fs.createReadStream(eyePicPath));

        const aiResponse = await axios.post(
            'https://opticscan.humicprototypingapi.online/predict',
            form,
            {
                headers: form.getHeaders(),
            }
        );

        const aiDiagnosis =
            aiResponse.data?.predicted_class || 'Tidak ada hasil dari AI';

        const newExam = await Examination.create({
            patient_id: patientId,
            doctor_id: randomDoctor.user_id,
            examination_date: new Date(),
            eye_pic: req.file.filename,
            complaints: complaints || null,
            diagnosis: aiDiagnosis,
            doctors_note: null,
            status: 'ongoing',
        });

        res.status(201).json({
            message: 'Pemeriksaan berhasil diajukan',
            data: newExam,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengajukan pemeriksaan',
            error: error.message,
        });
    }
};

const diagnosisDokter = async (req, res) => {
    const user_id = req.user_id;
    const { examination_id, diagnosis, doctors_note } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (user.role != 'dokter') {
            return res.status(403).json({
                message: 'Hanya dokter yang bisa memberikan diagnosa',
            });
        }

        const examination = await Examination.findByPk(examination_id);
        if (!examination) {
            return res
                .status(404)
                .json({ message: 'Hasil pemeriksaan tidak ditemukan' });
        }

        if (examination.doctor_id !== user_id) {
            return res.status(403).json({
                message:
                    'Anda bukan dokter yang ditugaskan untuk pemeriksaan ini',
            });
        }

        await examination.update({
            diagnosis: diagnosis,
            doctors_note: doctors_note,
            status: 'complete',
        });

        res.status(200).json({
            message: 'Diagnosa berhasil diperbarui',
            data: examination,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal memberikan diagnosa',
            error: error.message,
        });
    }
};

module.exports = {
    getExamResult,
    submitExam,
    diagnosisDokter,
};
