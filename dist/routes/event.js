"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController = require("../controllers/event");
const router = express_1.Router();
router.get("/events", EventController.getEvents);
router.get("/event/:id", EventController.getEvent);
router.get("/event/authorId/:authorId", EventController.getEventeByUser);
router.get("/event/images/:id", EventController.getEventImages);
router.post("/event", EventController.addEvent);
router.put("/event/:id", EventController.updateEvent);
router.put("/event/image/:id", EventController.updateEventAndThumbnail);
router.put("/event/images/:id", EventController.updateEventImages);
router.put("/event/image/remove/:id", EventController.removeEventImage);
router.delete("/event/:id", EventController.deleteEvent);
router.delete("/event/images/:id", EventController.deleteEventImages);
exports.eventRouter = router;
//# sourceMappingURL=event.js.map