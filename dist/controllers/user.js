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
const PasswordReset_1 = require("../entity/PasswordReset");
// const userRepository: Repository<User> = await getRepository(User);
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield typeorm_1.getRepository(User_1.User).find({ relations: ["address"] });
        res.json(users);
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address"] });
        res.json(user);
    });
}
exports.getUser = getUser;
function getUserAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address"] });
        res.json(user.address);
    });
}
exports.getUserAddress = getUserAddress;
function getUserPreferences(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address", "preferences"] });
        res.json(user.preferences);
    });
}
exports.getUserPreferences = getUserPreferences;
function getUserCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address", "cart", "cart.items"] });
        res.json(user.cart);
    });
}
exports.getUserCart = getUserCart;
function getUserOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address", "orders"] });
        res.json(user.orders);
    });
}
exports.getUserOrders = getUserOrders;
function getFullUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address", "preferences", "cart", "cart.items", "orders"] });
        res.json(user);
    });
}
exports.getFullUser = getFullUser;
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
function updateFullUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["address", "preferences", "cart", "cart.items", "orders"] });
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
exports.updateFullUser = updateFullUser;
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
function getPasswordReset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordReset = yield typeorm_1.getRepository(PasswordReset_1.PasswordReset).findOne(req.params.token);
        res.json(passwordReset);
    });
}
exports.getPasswordReset = getPasswordReset;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        const oldPassword = user.password;
        const passwordReset = yield typeorm_1.getRepository(PasswordReset_1.PasswordReset).findOne(req.params.token);
        typeorm_1.getRepository(User_1.User).merge(user, req.body);
        // hash the password, to securely store on DB
        user.hashPassword();
        const result = yield typeorm_1.getRepository(User_1.User).save(user);
        passwordReset.success = (oldPassword !== result.password);
        passwordReset.activated = passwordReset.success;
        const passwordResetResult = yield typeorm_1.getRepository(PasswordReset_1.PasswordReset).save(passwordReset);
        return res.json(passwordResetResult);
    });
}
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=user.js.map