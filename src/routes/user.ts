import {Router} from "express";

import * as UserController from "../controllers/user";


const router: Router = Router();

router.get("/users", UserController.getUsers);

router.get("/user/:id", UserController.getUser);

router.get("/address/:id", UserController.getUserAddress);

router.get("/preferences/:id", UserController.getUserPreferences);

router.get("/cart/:id", UserController.getUserCart);

router.get("/orders/:id", UserController.getUserOrders);

router.get("/full/:id", UserController.getFullUser);

router.get("/resetpassword/:token", UserController.getPasswordReset);

router.get("/user/email/:email", UserController.getUserByMail);

router.post("/user", UserController.addUser);

router.post("/register", UserController.registerUser);

router.put("/user/:id", UserController.updateUser);

router.put("/password/:id/:token", UserController.updateUserPassword);

router.put("/user/image/:id", UserController.updateUserAndProfilePicture);

router.delete("/user/:id", UserController.deleteUser);


export const userRouter: Router = router;