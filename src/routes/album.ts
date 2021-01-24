import {Router} from "express";

import * as AlbumController from "../controllers/album";


const router: Router = Router();

router.get("/albums", AlbumController.getAlbums);

router.get("/album/:id", AlbumController.getAlbum);

router.get("/album/authorId/:authorId", AlbumController.getAlbumByUser);

router.post("/album", AlbumController.addAlbum);

router.put("/album/:id", AlbumController.updateAlbum);

router.delete("/album/:id", AlbumController.deleteAlbum);


export const albumRouter: Router = router;