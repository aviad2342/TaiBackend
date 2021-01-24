"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
exports.checkAuth = (req, res, next) => {
    // get the jwt token from the head
    const token = req.headers.auth;
    let jwtPayload;
    // try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // if token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    // the token is valid for 1 hour
    // send a new token on every request
    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, config_1.default.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    // call the next middleware or controller
    next();
};
//# sourceMappingURL=checkAuth.js.map