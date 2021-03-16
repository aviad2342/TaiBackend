"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationController = require("../controllers/registration");
const router = express_1.Router();
router.get("/users", registrationController.getRegisteredUsers);
router.get("/user/:id", registrationController.getRegisteredUser);
router.get("/verify/:token", registrationController.verifyUser);
router.get("/user/email/:email", registrationController.getRegisteredUserByMail);
router.post("/user", registrationController.registerUser);
router.post("/user/resetpassword", registrationController.resetUserPassword);
router.delete("/user/:id", registrationController.deleteRegisteredUser);
exports.registrationRouter = router;
//# sourceMappingURL=register.js.map