import {Router} from "express";

import * as TherapistController from "../controllers/therapist";


const router: Router = Router();

router.get("/therapists", TherapistController.getTherapists);

router.get("/therapist/:id", TherapistController.getTherapist);

router.get("/therapist/email/:email", TherapistController.getTherapistByMail);

router.post("/therapist", TherapistController.addTherapist);

router.put("/therapist/:id", TherapistController.updateTherapist);

router.put("/therapist/image/:id", TherapistController.updateTherapistAndProfilePicture);

router.delete("/therapist/:id", TherapistController.deleteTherapist);


export const therapistRouter: Router = router;