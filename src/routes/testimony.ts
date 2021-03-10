import {Router} from "express";

import * as TestimonyController from "../controllers/testimony";


const router: Router = Router();

router.get("/testimonies", TestimonyController.getTestimonies);

router.get("/testimony/:id", TestimonyController.getTestimony);

router.post("/testimony", TestimonyController.addTestimony);

router.put("/testimony/:id", TestimonyController.updateTestimony);

router.delete("/testimony/:id", TestimonyController.deleteTestimony);



export const testimonyRouter: Router = router;