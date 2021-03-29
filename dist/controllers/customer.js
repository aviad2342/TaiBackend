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
const fs = require("fs");
const Customer_1 = require("../entity/Customer");
const User_1 = require("../entity/User");
function getCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customers = yield typeorm_1.getRepository(Customer_1.Customer).find();
        res.json(customers);
    });
}
exports.getCustomers = getCustomers;
function getCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield typeorm_1.getRepository(Customer_1.Customer).findOne(req.params.id);
        res.json(customer);
    });
}
exports.getCustomer = getCustomer;
function addCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = typeorm_1.getRepository(Customer_1.Customer).create(req.body);
        customer.hashPassword();
        const results = yield typeorm_1.getRepository(Customer_1.Customer).save(customer).catch(error => {
            const imagePhat = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addCustomer = addCustomer;
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_1.User).findOne(req.params.id);
        const customerObj = typeorm_1.getRepository(Customer_1.Customer).create(req.body);
        let customer = new Customer_1.Customer();
        customer = customerObj;
        typeorm_1.getRepository(User_1.User).merge(user, customer);
        const results = yield typeorm_1.getRepository(User_1.User).save(customer);
        return res.json(results);
    });
}
exports.createCustomer = createCustomer;
function updateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield typeorm_1.getRepository(Customer_1.Customer).findOne(req.params.id);
        if (customer.profilePicture !== req.body.profilePicture) {
            const imagePhat = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Customer_1.Customer).merge(customer, req.body);
        const results = yield typeorm_1.getRepository(Customer_1.Customer).save(customer);
        return res.json(results);
    });
}
exports.updateCustomer = updateCustomer;
function deleteCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield typeorm_1.getRepository(Customer_1.Customer).findOne(req.params.id);
        const imagePhat = customer.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Customer_1.Customer).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCustomer = deleteCustomer;
function getCustomerByMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield typeorm_1.getRepository(Customer_1.Customer).findOne({ where: { email: req.params.email } });
        return res.json(customer);
    });
}
exports.getCustomerByMail = getCustomerByMail;
//# sourceMappingURL=customer.js.map