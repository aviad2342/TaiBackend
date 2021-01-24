"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController = require("../controllers/address");
const router = express_1.Router();
router.get("/countries", addressController.getCountries);
router.get("/countries/:prediction", addressController.getCountriesPrediction);
router.get("/cities", addressController.getCities);
router.get("/cities/:prediction", addressController.getCitiesPrediction);
router.get("/streets/:city", addressController.getStreets);
router.get("/city/streets/:city/:prediction", addressController.getStreetsPrediction);
exports.addressRouter = router;
//# sourceMappingURL=address.js.map