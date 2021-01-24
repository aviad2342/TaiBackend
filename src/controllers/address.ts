import {Request, Response} from "express";
import * as fs from  "fs";
import * as path from  "path";
import * as citiesjson from "../assets/cities.json";
import * as streetsjson from "../assets/streets.json";
import * as countriesjson from "../assets/countries.json";


interface ICountries {
    he: string;
    en: string;
  }

interface ICitiesNames {
    name: string;
  }

interface IStreets {
    city: string;
    streets: string[];
  }

interface ICities {
    cities: ICitiesNames[];
  }

export async function getCountries(req: Request, res: Response): Promise<any> {
    const countriesJson: ICountries[] = countriesjson.countries;
    const data: string[] = countriesJson.map(countries => {
        return countries.he;
    });
    return res.json(data);
}

export async function getCountriesPrediction(req: Request, res: Response): Promise<any> {
    const prediction: string = req.params.prediction;
    const countriesJson: ICountries[] = countriesjson.countries.filter((item) => item.he.startsWith(prediction)).slice(0 ,5);
    const data: string[] = countriesJson.map(countries => {
        return countries.he;
    });
    return res.json(data);
}

export async function getCities(req: Request, res: Response): Promise<any> {
    const citiesJson: ICitiesNames[] = citiesjson.cities;
    const data: string[] = citiesJson.map(cities => {
        return cities.name;
    });
    return res.json(data);
}

export async function getCitiesPrediction(req: Request, res: Response): Promise<any> {
    const prediction: string = req.params.prediction;
    const citiesJson: ICitiesNames[] = citiesjson.cities
    .filter((item) => item.name.startsWith(prediction) ||
    item.name.replace("'", "").startsWith(prediction) ||
    item.name.replace("-", " ").startsWith(prediction)
    ).slice(0 ,6);
    const data: string[] = citiesJson.map(cities => {
        return cities.name;
    });
    return res.json(data);
}

export async function getStreetsPrediction(req: Request, res: Response): Promise<any> {
    const prediction: string = req.params.prediction;
    const streetsJson: IStreets[] = streetsjson;
    const cityStreets: string[] = streetsJson.find((item) => item.city === req.params.city).streets;
    const streets: string[] = cityStreets
    .filter((item) => item.startsWith(prediction) ||
    item.replace("'", "").startsWith(prediction) ||
    item.replace("-", " ").startsWith(prediction)
    ).slice(0 ,6);
    return res.json(streets);
}

export async function getStreets(req: Request, res: Response): Promise<any> {
    const city: string = req.params.city;
    const streetsJson: IStreets[] = streetsjson;
    const streets: string[] = streetsJson.find((item) => item.city === req.params.city || item.city.includes(city)).streets;
    return res.json(streets);
}


