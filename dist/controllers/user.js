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
// const userRepository: Repository<User> = await getRepository(User);
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield typeorm_1.getRepository(User_1.User).find();
        res.json(users);
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        res.json(user);
    });
}
exports.getUser = getUser;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = typeorm_1.getRepository(User_1.User).create(req.body);
        // hash the password, to securely store on DB
        user.hashPassword();
        const results = yield typeorm_1.getRepository(User_1.User).save(user).catch(error => {
            const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addUser = addUser;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = typeorm_1.getRepository(User_1.User).create(req.body);
        // hash the password, to securely store on DB
        user.hashPassword();
        const results = yield typeorm_1.getRepository(User_1.User).save(user);
        return res.json(results);
    });
}
exports.registerUser = registerUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        if (user.profilePicture !== req.body.profilePicture) {
            const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(User_1.User).merge(user, req.body);
        const results = yield typeorm_1.getRepository(User_1.User).save(user);
        return res.json(results);
    });
}
exports.updateUser = updateUser;
function updateUserAndProfilePicture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        typeorm_1.getRepository(User_1.User).merge(user, req.body);
        const results = yield typeorm_1.getRepository(User_1.User).save(user);
        return res.json(results);
    });
}
exports.updateUserAndProfilePicture = updateUserAndProfilePicture;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        const imagePhat = user.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(User_1.User).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteUser = deleteUser;
function getUserByMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne({ where: { email: req.params.email } });
        return res.json(user);
    });
}
exports.getUserByMail = getUserByMail;
//# sourceMappingURL=user.js.map