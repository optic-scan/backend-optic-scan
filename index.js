require('dotenv').config();
const PORT = process.env.PORT | 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/configs/database.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT.js');

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Sync table pada database
(async () => {
    await db.sync();
})();

app.use('/', require('./src/routes/AuthRoutes.js'));
app.use('/user', verifyJWT, require('./src/routes/UserRoutes.js'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
