"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController = require("../controllers/customer");
const router = express_1.Router();
router.get("/customers", CustomerController.getCustomers);
router.get("/customer/:id", CustomerController.getCustomer);
router.get("/customer/email/:email", CustomerController.getCustomerByMail);
router.get("/customer/orders/:id", CustomerController.getCustomerByMail);
router.post("/customer", CustomerController.addCustomer);
router.put("/customer/:id", CustomerController.updateCustomer);
router.delete("/customer/:id", CustomerController.deleteCustomer);
exports.customerRouter = router;
//# sourceMappingURL=customer.js.map