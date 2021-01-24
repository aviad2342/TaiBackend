import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Therapist } from "../entity/Therapist";


export async function getTherapists(req: Request, res: Response): Promise<void> {
    const therapists: Therapist[] = await getRepository(Therapist).find();
        res.json(therapists);
}

export async function getTherapist(req: Request, res: Response): Promise<void> {
     const therapist: Therapist = await getRepository(Therapist).findOne(req.params.id);
         res.json(therapist);
 }

 export async function addTherapist(req: Request, res: Response): Promise<any> {
     const therapist: any = getRepository(Therapist).create(req.body);

    therapist.hashPassword();

    const results: Therapist = await getRepository(Therapist).save(therapist).catch( error => {
        const imagePhat: string = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
    return res.json(results);
}

export async function updateTherapist(req: Request, res: Response): Promise<any> {
    const therapist: Therapist = await getRepository(Therapist).findOne(req.params.id);
    if(therapist.profilePicture !== req.body.profilePicture) {
        const imagePhat: string = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Therapist).merge(therapist, req.body);
    const results: Therapist = await getRepository(Therapist).save(therapist);
    return res.json(results);
}

export async function updateTherapistAndProfilePicture(req: Request, res: Response): Promise<any> {
    const therapist: Therapist = await getRepository(Therapist).findOne(req.params.id);
    const imagePhat: string = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    getRepository(Therapist).merge(therapist, req.body);
    const results: Therapist = await getRepository(Therapist).save(therapist);
    return res.json(results);
}

export async function deleteTherapist(req: Request, res: Response): Promise<any> {
    const therapist: Therapist = await getRepository(Therapist).findOne(req.params.id);
    const imagePhat: string = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Therapist).delete(req.params.id);
    return res.json(results);
}

export async function getTherapistByMail(req: Request, res: Response): Promise<any> {
      const therapist: Therapist = await getRepository(Therapist).findOne({ where: { email: req.params.email } });
      return res.json(therapist);
}