import {Router} from "express";

import * as PhotoController from "../controllers/photo";


const router: Router = Router();

router.get("/photos", PhotoController.getPhotos);

router.get("/photo/:id", PhotoController.getPhoto);

router.get("/photo/photos/:id", PhotoController.getAlbumPhotos);

router.get("/photo/album/:id", PhotoController.getPhotoAlbum);

router.post("/photo", PhotoController.addPhoto);

router.put("/photo/:id", PhotoController.updatePhoto);

router.delete("/photo/:id", PhotoController.deletePhoto);


export const photoRouter: Router = router;