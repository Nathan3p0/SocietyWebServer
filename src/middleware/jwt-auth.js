const AuthService = require('../auth/auth-service');

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || '';

    let bearerToken;

    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(400).json(
            { error: 'Missing bearer token' }
        );
    } else {
        bearerToken = authToken.slice(7, authToken.length);
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken);

    } catch (error) {
        res.status(401).json(
            { error: 'Unauthorized Request' }
        );
    }
}

module.exports = requireAuth;