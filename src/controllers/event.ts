import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Event } from "../entity/Event";
import { Item } from "../entity/Item";


export async function getEvents(req: Request, res: Response): Promise<void> {
    const events: Event[] = await getRepository(Event).find();
        res.json(events);
}

export async function getEvent(req: Request, res: Response): Promise<void> {
     const event: Event = await getRepository(Event).findOne(req.params.id, { relations: ["speakers", "participants"]});
         res.json(event);
 }

 export async function addEvent(req: Request, res: Response): Promise<any> {
     const event: any = getRepository(Event).create(req.body);
     const results: Event = await getRepository(Event).save(event).catch( error => {
        const imagePhat: string = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateEvent(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    if(event.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Event).merge(event, req.body);
    const results: Event = await getRepository(Event).save(event);
    return res.json(results);
}

export async function updateEventAndThumbnail(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    const imagePhat: string = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    getRepository(Event).merge(event, req.body);
    const results: Event = await getRepository(Event).save(event);
    return res.json(results);
}

export async function updateEventImages(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    event.images.push(...req.body.images);
    const result: Event = await getRepository(Event).save(event);
    return res.json(result);
}

export async function deleteEvent(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    const imagePhat: string = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const item: Item = await getRepository(Item).findOne({ where: { productId: event.id } });
    if(item) {
        await getRepository(Item).delete(item.id);
    }
    const results: DeleteResult = await getRepository(Event).delete(req.params.id);
    return res.json(results);
}

export async function removeEventImage(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    const image: string = req.body.image;
    const imagePhat: string[] = image.split("http://aviadbenhayun.com:3000/");
    if(fs.existsSync("./src/" + imagePhat[1])) {
        fs.unlinkSync("./src/" + imagePhat[1]);
    }
    event.images.splice(event.images.indexOf(image), 1);
    const result: Event = await getRepository(Event).save(event);
    return res.json(result);
}

export async function deleteEventImages(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    const images: string[] = [];
    images.push(...req.body);
    images.forEach(image => {
        const imagePhat: string[] = image.split("http://localhost:3000/");
        if(fs.existsSync("./src/" + imagePhat[1])) {
            fs.unlinkSync("./src/" + imagePhat[1]);
        }
        event.images.splice(event.images.indexOf(image), 1);
    });

    const result: Event = await getRepository(Event).save(event);
    return res.json(result);
}

export async function getEventeByUser(req: Request, res: Response): Promise<any> {
      const events: Event[] = await getRepository(Event).find({ where: { authorId: req.params.authorId } });
      return res.json(events);
}


export async function getEventImages(req: Request, res: Response): Promise<any> {
    const event: Event = await getRepository(Event).findOne(req.params.id);
    return res.json(event.images);
}
