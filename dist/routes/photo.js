"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PhotoController = require("../controllers/photo");
const router = express_1.Router();
router.get("/photos", PhotoController.getPhotos);
router.get("/photo/:id", PhotoController.getPhoto);
router.get("/photo/photos/:id", PhotoController.getAlbumPhotos);
router.get("/photo/album/:id", PhotoController.getPhotoAlbum);
router.post("/photo", PhotoController.addPhoto);
router.put("/photo/:id", PhotoController.updatePhoto);
router.delete("/photo/:id", PhotoController.deletePhoto);
exports.photoRouter = router;
//# sourceMappingURL=photo.js.map