"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AlbumController = require("../controllers/album");
const router = express_1.Router();
router.get("/albums", AlbumController.getAlbums);
router.get("/album/:id", AlbumController.getAlbum);
router.get("/album/authorId/:authorId", AlbumController.getAlbumByUser);
router.post("/album", AlbumController.addAlbum);
router.put("/album/:id", AlbumController.updateAlbum);
router.delete("/album/:id", AlbumController.deleteAlbum);
exports.albumRouter = router;
//# sourceMappingURL=album.js.map