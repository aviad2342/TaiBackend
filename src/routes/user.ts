import {Router} from "express";

import * as UserController from "../controllers/user";


const router: Router = Router();

router.get("/users", UserController.getUsers);

router.get("/user/:id", UserController.getUser);

router.get("/user/email/:email", UserController.getUserByMail);

router.post("/user", UserController.addUser);

router.post("/register", UserController.registerUser);

router.put("/user/:id", UserController.updateUser);

router.put("/user/image/:id", UserController.updateUserAndProfilePicture);

router.delete("/user/:id", UserController.deleteUser);


export const userRouter: Router = router;