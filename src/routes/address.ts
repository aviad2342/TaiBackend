import {Router} from "express";

import * as addressController from "../controllers/address";


const router: Router = Router();

router.get("/countries", addressController.getCountries);

router.get("/countries/:prediction", addressController.getCountriesPrediction);

router.get("/cities", addressController.getCities);

router.get("/cities/:prediction", addressController.getCitiesPrediction);

router.get("/streets/:city", addressController.getStreets);

router.get("/city/streets/:city/:prediction", addressController.getStreetsPrediction);


export const addressRouter: Router = router;