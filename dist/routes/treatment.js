"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TreatmentController = require("../controllers/treatment");
const router = express_1.Router();
router.get("/treatments", TreatmentController.getTreatments);
router.get("/treatments/treatmentType/:treatmentType", TreatmentController.getTreatmentsByTherapist);
router.get("/treatment/:id", TreatmentController.getTreatment);
router.get("/treatment/therapistId/:therapistId", TreatmentController.getTreatmentsByTherapist);
router.post("/treatment", TreatmentController.addTreatment);
router.put("/treatment/:id", TreatmentController.updateTreatment);
router.delete("/treatment/:id", TreatmentController.deleteTreatment);
exports.treatmentRouter = router;
//# sourceMappingURL=treatment.js.map