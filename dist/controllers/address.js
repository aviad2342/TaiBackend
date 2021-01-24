"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const citiesjson = require("../assets/cities.json");
const streetsjson = require("../assets/streets.json");
const countriesjson = require("../assets/countries.json");
function getCountries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const countriesJson = countriesjson.countries;
        const data = countriesJson.map(countries => {
            return countries.he;
        });
        return res.json(data);
    });
}
exports.getCountries = getCountries;
function getCountriesPrediction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prediction = req.params.prediction;
        const countriesJson = countriesjson.countries.filter((item) => item.he.startsWith(prediction)).slice(0, 5);
        const data = countriesJson.map(countries => {
            return countries.he;
        });
        return res.json(data);
    });
}
exports.getCountriesPrediction = getCountriesPrediction;
function getCities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const citiesJson = citiesjson.cities;
        const data = citiesJson.map(cities => {
            return cities.name;
        });
        return res.json(data);
    });
}
exports.getCities = getCities;
function getCitiesPrediction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prediction = req.params.prediction;
        const citiesJson = citiesjson.cities
            .filter((item) => item.name.startsWith(prediction) ||
            item.name.replace("'", "").startsWith(prediction) ||
            item.name.replace("-", " ").startsWith(prediction)).slice(0, 6);
        const data = citiesJson.map(cities => {
            return cities.name;
        });
        return res.json(data);
    });
}
exports.getCitiesPrediction = getCitiesPrediction;
function getStreetsPrediction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prediction = req.params.prediction;
        const streetsJson = streetsjson;
        const cityStreets = streetsJson.find((item) => item.city === req.params.city).streets;
        const streets = cityStreets
            .filter((item) => item.startsWith(prediction) ||
            item.replace("'", "").startsWith(prediction) ||
            item.replace("-", " ").startsWith(prediction)).slice(0, 6);
        return res.json(streets);
    });
}
exports.getStreetsPrediction = getStreetsPrediction;
function getStreets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const city = req.params.city;
        const streetsJson = streetsjson;
        const streets = streetsJson.find((item) => item.city === req.params.city || item.city.includes(city)).streets;
        return res.json(streets);
    });
}
exports.getStreets = getStreets;
//# sourceMappingURL=address.js.map