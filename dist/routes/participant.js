"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParticipantController = require("../controllers/participant");
const router = express_1.Router();
router.get("/participants", ParticipantController.getParticipants);
router.get("/participant/:id", ParticipantController.getParticipant);
router.get("/participants/:eventId", ParticipantController.getEventParticipants);
router.get("/participant/usersList/:eventId", ParticipantController.getUsersListToAdd);
router.post("/participant", ParticipantController.addParticipant);
router.put("/participant/:id", ParticipantController.updateParticipant);
router.delete("/participant/:id", ParticipantController.deleteParticipant);
exports.participantRouter = router;
//# sourceMappingURL=participant.js.map