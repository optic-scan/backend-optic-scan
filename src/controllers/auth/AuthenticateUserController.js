const handleAuthenticateUser = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    return res.json({ authenticated: true });
};

module.exports = handleAuthenticateUser;
