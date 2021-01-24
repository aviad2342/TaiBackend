import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, SelectQueryBuilder} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Participant } from "../entity/Participant";
import { User } from "../entity/User";


export async function getParticipants(req: Request, res: Response): Promise<void> {
    const participants: Participant[] = await getRepository(Participant).find();
        res.json(participants);
}

export async function getEventParticipants(req: Request, res: Response): Promise<any> {
    const participants: Participant[] = await getRepository(Participant).find({ where: { event: req.params.eventId } });
    return res.json(participants);
}

export async function getParticipant(req: Request, res: Response): Promise<void> {
     const participant: Participant = await getRepository(Participant).findOne(req.params.id, { relations: ["speaker"] });
         res.json(participant);
 }

 export async function addParticipant(req: Request, res: Response): Promise<any> {
     const participant: any = getRepository(Participant).create(req.body);
     const results: Participant = await getRepository(Participant).save(participant).catch( error => {
        const imagePhat: string = participant.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateParticipant(req: Request, res: Response): Promise<any> {
    const participant: Participant = await getRepository(Participant).findOne(req.params.id);
    getRepository(Participant).merge(participant, req.body);
    const results: Participant = await getRepository(Participant).save(participant);
    return res.json(results);
}


export async function deleteParticipant(req: Request, res: Response): Promise<any> {
    const participant: Participant = await getRepository(Participant).findOne(req.params.id);
    const imagePhat: string = participant.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Participant).delete(req.params.id);
    return res.json(results);
}

export async function getParticipantByEvent(req: Request, res: Response): Promise<any> {
      const participants: Participant[] = await getRepository(Participant).find({ where: { authorId: req.params.authorId } });
      return res.json(participants);
}

export async function getUsersListToAdd(req: Request, res: Response): Promise<any> {
    const participantsQb: SelectQueryBuilder<Participant> = await getRepository(Participant)
    .createQueryBuilder("participant")
    .select("participant.id")
    .where("participant.eventId = :eventId", { eventId: req.params.eventId });

    const users: User[] = await getRepository(User)
    .createQueryBuilder("user")
    .where("user.id NOT IN (" + participantsQb.getQuery() + ")")
    .setParameters(participantsQb.getParameters())
    .getMany();

    return res.json(users);
}