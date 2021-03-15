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
        const resObject = {
            id: '',
            firstName: '',
            lastName: '',
            success: true,
            verified: false,
            alreadyVerified: false,
            userSaved: true,
            UpdateRegisteredUser: true,
            notRegistered: false
        };
        if (!pendingUser) {
            resObject.notRegistered = true;
            resObject.success = false;
            return res.json(resObject);
        }
        resObject.id = pendingUser.id;
        resObject.firstName = pendingUser.firstName;
        resObject.lastName = pendingUser.lastName;
        if (pendingUser.verified) {
            resObject.verified = true;
            resObject.alreadyVerified = true;
            resObject.success = false;
            return res.json(resObject);
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
            resObject.userSaved = false;
            resObject.success = false;
        });
        resObject.verified = true;
        pendingUser.verificationDate = new Date();
        pendingUser.verified = true;
        yield typeorm_1.getRepository(registered_1.Registered).save(pendingUser).catch(error => {
            resObject.UpdateRegisteredUser = false;
            resObject.verified = false;
            resObject.success = false;
        });
        return res.json(resObject);
    });
}
exports.verifyUser = verifyUser;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = typeorm_1.getRepository(registered_1.Registered).create(req.body);
        let minfo;
        // hash the password, to securely store on DB
        user.hashPassword();
        const result = yield typeorm_1.getRepository(registered_1.Registered).save(user).catch(error => {
            const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        const verificationUrl = 'http://localhost:8100/verification/' + result.verificationToken;
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
        transporter.sendMail(mailOptions, (error, info) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                minfo = error;
            }
            result.emailSent = true;
            yield typeorm_1.getRepository(registered_1.Registered).save(result);
        }));
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
function resetUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne({ where: { email: req.params.email } });
        const email = user.email;
        const resetPasswordUrl = 'http://localhost:8100/passwordreset/' + email;
        const link = `<p>לאיפוס הסיסמה לחץ על הקישור:</p>
    <br>
    <a href="${resetPasswordUrl}"> קישור לאיפוס הסיסמה</a>
    <br>
    <img src="https://images.ravpages.co.il/xsite_resources/user_content/5c/f5/a5/b4/5cf5a5b4496ea854fc907351d3823ee1/images/3495e0655839037a776975053843933c_226X236.png?ver=3.12&rxc=1532355884" alt="פילאי הנשמה">
  `;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'subconsciou.Service@gmail.com',
                pass: 'aviad2342'
            },
        });
        const mailOptions = {
            from: 'subconsciou.Service@gmail.com',
            to: email,
            subject: 'איפוס סיסמה',
            text: 'לאיפוס הסיסמה לחץ על הקישור:',
            html: link,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send(false);
            }
            return res.send(true);
        });
        return res.json(true);
    });
}
exports.resetUserPassword = resetUserPassword;
//# sourceMappingURL=registration.js.map