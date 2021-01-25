"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController = require("../controllers/upload");
const file_1 = require("../middleware/file");
const articleImages_1 = require("../middleware/articleImages");
const courseImages_1 = require("../middleware/courseImages");
const userImages_1 = require("../middleware/userImages");
const speakerImages_1 = require("../middleware/speakerImages");
const eventImages_1 = require("../middleware/eventImages");
const eventPictures_1 = require("../middleware/eventPictures");
const participantImages_1 = require("../middleware/participantImages");
const articleBodyImages_1 = require("../middleware/articleBodyImages");
const itemImages_1 = require("../middleware/itemImages");
const therapistImages_1 = require("../middleware/therapistImages");
const treatmentImages_1 = require("../middleware/treatmentImages");
const router = express_1.Router();
router.get("/download/image", uploadController.getImage);
router.post("/upload", file_1.upload, uploadController.uploadImage);
router.post("/uploadUserImage", userImages_1.uploadUserImage, uploadController.uploadUserImage);
router.post("/uploadTherapistImage", therapistImages_1.uploadTherapistImage, uploadController.uploadTherapistImage);
router.post("/uploadTreatmentImage", treatmentImages_1.uploadTreatmentImage, uploadController.uploadTreatmentImage);
router.post("/uploadSpeakerImage", speakerImages_1.uploadSpeakerImage, uploadController.uploadSpeakerImage);
router.post("/uploadParticipantImage", participantImages_1.uploadParticipantImage, uploadController.uploadParticipantImage);
router.post("/uploadEventImage", eventImages_1.uploadEventeImage, uploadController.uploadEventImage);
router.post("/uploadEventePictures", eventPictures_1.uploadEventePictures, uploadController.uploadEventPictures);
router.post("/uploadArticleImage", articleImages_1.uploadArticleImage, uploadController.uploadArticleImage);
router.post("/uploadItemImage", itemImages_1.uploadItemImage, uploadController.uploadItemImage);
router.post("/uploadArticleBodyImage", articleBodyImages_1.articleBodyImages, uploadController.uploadArticleImage);
router.post("/uploadCourseImage", courseImages_1.uploadCourseImage, uploadController.uploadCourseImage);
router.delete("/deleteEventImage/:name", uploadController.deleteEventImage);
router.delete("/deletImage", uploadController.deleteImage);
exports.uploadRouter = router;
//# sourceMappingURL=upload.js.map