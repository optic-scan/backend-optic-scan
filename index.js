require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/configs/database.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT.js');

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Sync table pada database
(async () => {
    try {
        await db.sync();
        console.log('Database synced');
    } catch (err) {
        console.error('DB Sync Error:', err);
    }
})();

app.use('/auth', require('./src/routes/AuthRoutes.js'));
app.use('/user', verifyJWT, require('./src/routes/UserRoutes.js'));
app.use('/exam', verifyJWT, require('./src/routes/ExaminationRoutes.js'));
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
