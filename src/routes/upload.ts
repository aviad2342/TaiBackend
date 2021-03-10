import {Router} from "express";

import * as uploadController from "../controllers/upload";

import { upload } from "../middleware/file";
import { uploadArticleImage } from "../middleware/articleImages";
import { uploadCourseImage } from "../middleware/courseImages";
import { uploadUserImage } from "../middleware/userImages";
import { uploadSpeakerImage } from "../middleware/speakerImages";
import { uploadEventeImage } from "../middleware/eventImages";
import { uploadEventePictures } from "../middleware/eventPictures";
import { uploadParticipantImage } from "../middleware/participantImages";
import { articleBodyImages } from "../middleware/articleBodyImages";
import { uploadItemImage } from "../middleware/itemImages";
import { uploadTherapistImage } from "../middleware/therapistImages";
import { uploadTreatmentImage } from "../middleware/treatmentImages";
import { uploadTestimonyImage } from "../middleware/testimonyImages";


const router: Router = Router();

router.get("/download/image", uploadController.getImage);

router.post("/upload", upload, uploadController.uploadImage);

router.post("/uploadUserImage", uploadUserImage, uploadController.uploadUserImage);

router.post("/uploadTestimonyImage", uploadTestimonyImage, uploadController.uploadTestimonyImage);

router.post("/uploadTherapistImage", uploadTherapistImage, uploadController.uploadTherapistImage);

router.post("/uploadTreatmentImage", uploadTreatmentImage, uploadController.uploadTreatmentImage);

router.post("/uploadSpeakerImage", uploadSpeakerImage, uploadController.uploadSpeakerImage);

router.post("/uploadParticipantImage", uploadParticipantImage, uploadController.uploadParticipantImage);

router.post("/uploadEventImage", uploadEventeImage, uploadController.uploadEventImage);

router.post("/uploadEventePictures", uploadEventePictures, uploadController.uploadEventPictures);

router.post("/uploadArticleImage", uploadArticleImage, uploadController.uploadArticleImage);

router.post("/uploadItemImage", uploadItemImage, uploadController.uploadItemImage);

router.post("/uploadArticleBodyImage", articleBodyImages, uploadController.uploadArticleImage);

router.post("/uploadCourseImage", uploadCourseImage, uploadController.uploadCourseImage);

router.delete("/deleteEventImage/:name", uploadController.deleteEventImage);

router.delete("/deletImage", uploadController.deleteImage);


export const uploadRouter: Router = router;