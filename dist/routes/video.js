"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VideoController = require("../controllers/video");
const router = express_1.Router();
router.get("/videos", VideoController.getVideos);
router.get("/video/:id", VideoController.getVideo);
router.post("/video", VideoController.addVideo);
router.put("/video/:id", VideoController.updateVideo);
router.delete("/video/:id", VideoController.deleteVideo);
exports.videoRouter = router;
//# sourceMappingURL=video.js.map