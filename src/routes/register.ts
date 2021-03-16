import {Router} from "express";

import * as registrationController from "../controllers/registration";


const router: Router = Router();

router.get("/users", registrationController.getRegisteredUsers);

router.get("/user/:id", registrationController.getRegisteredUser);

router.get("/verify/:token", registrationController.verifyUser);

router.get("/user/email/:email", registrationController.getRegisteredUserByMail);

router.post("/user", registrationController.registerUser);

router.post("/user/resetpassword", registrationController.resetUserPassword);

router.delete("/user/:id", registrationController.deleteRegisteredUser);


export const registrationRouter: Router = router;