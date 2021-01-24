import {Router} from "express";

import * as SpeakerController from "../controllers/speaker";


const router: Router = Router();

router.get("/speakers", SpeakerController.getSpeakers);

router.get("/speaker/:id", SpeakerController.addSpeaker);

router.get("/speaker/authorId/:authorId", SpeakerController.getSpeakereByEvent);

router.post("/speaker", SpeakerController.addSpeaker);

router.put("/speaker/:id", SpeakerController.updateSpeaker);

router.put("/speaker/image/:id", SpeakerController.updateSpeakerAndImage);

router.delete("/speaker/:id", SpeakerController.deleteSpeaker);


export const speakerRouter: Router = router;