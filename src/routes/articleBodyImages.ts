import {Router} from "express";
import * as articleBodyImagesController from "../controllers/articleBodyImages";

import { articleBodyImages } from "../middleware/articleBodyImages";


const router: Router = Router();

router.post("/", articleBodyImages, articleBodyImagesController.uploadArticleBodyImage);



export const articleBodyImagesRouter: Router = router;