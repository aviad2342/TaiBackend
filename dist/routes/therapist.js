"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TherapistController = require("../controllers/therapist");
const router = express_1.Router();
router.get("/therapists", TherapistController.getTherapists);
router.get("/therapist/:id", TherapistController.getTherapist);
router.get("/therapist/email/:email", TherapistController.getTherapistByMail);
router.post("/therapist", TherapistController.addTherapist);
router.put("/therapist/:id", TherapistController.updateTherapist);
router.put("/therapist/image/:id", TherapistController.updateTherapistAndProfilePicture);
router.delete("/therapist/:id", TherapistController.deleteTherapist);
exports.therapistRouter = router;
//# sourceMappingURL=therapist.js.map