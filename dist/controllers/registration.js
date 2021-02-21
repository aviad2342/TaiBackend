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
const User_1 = require("../entity/User");
const fs = require("fs");
const nodemailer = require("nodemailer");
const registered_1 = require("../entity/registered");
function getRegisteredUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield typeorm_1.getRepository(registered_1.Registered).find();
        res.json(users);
    });
}
exports.getRegisteredUsers = getRegisteredUsers;
function getRegisteredUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(registered_1.Registered).findOne(req.params.id);
        res.json(user);
    });
}
exports.getRegisteredUser = getRegisteredUser;
function verifyUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pendingUser = yield typeorm_1.getRepository(registered_1.Registered).findOne({ where: { verificationToken: req.params.token } });
        if (!pendingUser) {
            return;
        }
        const newUser = new User_1.User();
        newUser.id = pendingUser.id;
        newUser.firstName = pendingUser.firstName;
        newUser.lastName = pendingUser.lastName;
        newUser.password = pendingUser.password;
        newUser.phone = pendingUser.phone;
        newUser.email = pendingUser.email;
        newUser.date = pendingUser.date;
        newUser.country = pendingUser.country;
        newUser.city = pendingUser.city;
        newUser.street = pendingUser.street;
        newUser.houseNumber = pendingUser.houseNumber;
        newUser.apartment = pendingUser.apartment;
        newUser.entry = pendingUser.entry;
        newUser.profilePicture = pendingUser.profilePicture;
        const user = typeorm_1.getRepository(User_1.User).create(newUser);
        const results = yield typeorm_1.getRepository(User_1.User).save(user).catch(error => {
            return;
        });
        pendingUser.verificationDate = new Date();
        pendingUser.verified = true;
        yield typeorm_1.getRepository(registered_1.Registered).save(pendingUser);
        return res.json(results);
    });
}
exports.verifyUser = verifyUser;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = typeorm_1.getRepository(registered_1.Registered).create(req.body);
        let minfo;
        // hash the password, to securely store on DB
        user.hashPassword();
        const result = yield typeorm_1.getRepository(registered_1.Registered).save(user);
        const verificationUrl = 'http://aviadbenhayun.com:3000/api/register/verify/' + result.verificationToken;
        const link = `<a href="${verificationUrl}">קישור להפעלת חשבון</a>`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'subconsciou.Service@gmail.com',
                pass: 'aviad2342'
            },
        });
        const mailOptions = {
            from: 'subconsciou.Service@gmail.com',
            to: result.email,
            subject: 'הפעלת חשבון פלאי הנשמה',
            text: 'להפעלת החשבון לחץ על הקישור:',
            html: link,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                minfo = error;
            }
            minfo = info;
        });
        return res.json(result);
    });
}
exports.registerUser = registerUser;
function deleteRegisteredUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(registered_1.Registered).findOne(req.params.id);
        const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(registered_1.Registered).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteRegisteredUser = deleteRegisteredUser;
function getRegisteredUserByMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(registered_1.Registered).findOne({ where: { email: req.params.email } });
        return res.json(user);
    });
}
exports.getRegisteredUserByMail = getRegisteredUserByMail;
function testMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let minfo;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'subconsciou.Service@gmail.com',
                pass: 'aviad2342'
            },
        });
        const mailOptions = {
            from: 'subconsciou.Service@gmail.com',
            to: 'aviad2342@walla.com',
            subject: 'Hello',
            text: 'Hello from node.js',
            html: "<b>Hello world?</b>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                minfo = error;
            }
            minfo = info;
        });
        return res.json(minfo);
    });
}
exports.testMail = testMail;
//# sourceMappingURL=registration.js.map