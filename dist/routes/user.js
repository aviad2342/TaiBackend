"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = require("../controllers/user");
const router = express_1.Router();
router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUser);
router.get("/user/email/:email", UserController.getUserByMail);
router.post("/user", UserController.addUser);
router.post("/register", UserController.registerUser);
router.put("/user/:id", UserController.updateUser);
router.put("/user/image/:id", UserController.updateUserAndProfilePicture);
router.delete("/user/:id", UserController.deleteUser);
exports.userRouter = router;
//# sourceMappingURL=user.js.map