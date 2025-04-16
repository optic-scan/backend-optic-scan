const { User } = require('../../models');

const handleAuthenticateUser = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    isTokenValid = User.findOne({ where: { refresh_token: token } });
    if (!isTokenValid) {
        return res.status(401).json({ authenticated: false });
    }

    return res.json({ authenticated: true });
};

module.exports = handleAuthenticateUser;
