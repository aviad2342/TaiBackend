"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SpeakerController = require("../controllers/speaker");
const router = express_1.Router();
router.get("/speakers", SpeakerController.getSpeakers);
router.get("/speaker/:id", SpeakerController.addSpeaker);
router.get("/speaker/authorId/:authorId", SpeakerController.getSpeakereByEvent);
router.post("/speaker", SpeakerController.addSpeaker);
router.put("/speaker/:id", SpeakerController.updateSpeaker);
router.put("/speaker/image/:id", SpeakerController.updateSpeakerAndImage);
router.delete("/speaker/:id", SpeakerController.deleteSpeaker);
exports.speakerRouter = router;
//# sourceMappingURL=speaker.js.map