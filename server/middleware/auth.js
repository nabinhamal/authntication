import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** auth middleware */
export default async function Auth(req, res, next) {
    try {
        // Access authorize header to validate request
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: "Authorization header missing" });
        }

        const token = authorizationHeader.split(" ")[1];

        // Retrieve the user details for the logged-in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Authentication Failed!" });
    }
}

export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
}
