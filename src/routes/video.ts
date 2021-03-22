import {Router} from "express";

import * as VideoController from "../controllers/video";


const router: Router = Router();

router.get("/videos", VideoController.getVideos);

router.get("/video/:id", VideoController.getVideo);

router.post("/video", VideoController.addVideo);

router.put("/video/:id", VideoController.updateVideo);

router.delete("/video/:id", VideoController.deleteVideo);


export const videoRouter: Router = router;