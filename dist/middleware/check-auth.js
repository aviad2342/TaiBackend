"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "You are not authenticated!" });
    }
};
//# sourceMappingURL=check-auth.js.map