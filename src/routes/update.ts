import {Router} from "express";

import * as UpdateController from "../controllers/update";


const router: Router = Router();

router.get("/updates", UpdateController.getUpdates);

router.get("/update/:id", UpdateController.getUpdate);

router.post("/update", UpdateController.addUpdate);

router.put("/update/:id", UpdateController.updateUpdate);

router.delete("/update/:id", UpdateController.deleteUpdate);


export const updateRouter: Router = router;