"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController = require("../controllers/auth");
const router = express_1.Router();
router.post("/login", AuthController.login);
exports.authRouter = router;
//# sourceMappingURL=auth.js.map