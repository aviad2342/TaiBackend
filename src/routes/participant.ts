import {Router} from "express";

import * as ParticipantController from "../controllers/participant";


const router: Router = Router();

router.get("/participants", ParticipantController.getParticipants);

router.get("/participant/:id", ParticipantController.getParticipant);

router.get("/participants/:eventId", ParticipantController.getEventParticipants);

router.get("/participant/usersList/:eventId", ParticipantController.getUsersListToAdd);

router.post("/participant", ParticipantController.addParticipant);

router.put("/participant/:id", ParticipantController.updateParticipant);

router.delete("/participant/:id", ParticipantController.deleteParticipant);


export const participantRouter: Router = router;