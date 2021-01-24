import {Router} from "express";

import * as TreatmentController from "../controllers/treatment";


const router: Router = Router();

router.get("/treatments", TreatmentController.getTreatments);

router.get("/treatments/treatmentType/:treatmentType", TreatmentController.getTreatmentsByTherapist);

router.get("/treatment/:id", TreatmentController.getTreatment);

router.get("/treatment/therapistId/:therapistId", TreatmentController.getTreatmentsByTherapist);

router.post("/treatment", TreatmentController.addTreatment);

router.put("/treatment/:id", TreatmentController.updateTreatment);

router.delete("/treatment/:id", TreatmentController.deleteTreatment);


export const treatmentRouter: Router = router;