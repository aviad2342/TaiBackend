"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const jwt = require("jsonwebtoken");
const User_1 = require("../entity/User");
const config_1 = require("../config/config");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send();
        }
        let user;
        try {
            user = yield typeorm_1.getRepository(User_1.User).findOneOrFail({ where: { email } });
        }
        catch (error) {
            res.status(401).json({ error: "EMAIL_NOT_FOUND" });
        }
        // check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).json({ error: "INVALID_PASSWORD" });
            return;
        }
        // sing JWT, valid for 1 hour
        const token = jwt.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: "1h" });
        // send the jwt in the response
        res.status(200).json({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
            token,
            expiresIn: 36000,
        });
    });
}
exports.login = login;
//# sourceMappingURL=auth.js.map