import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import * as fs from  "fs";
import { Album } from "../entity/Album";


export async function getAlbums(req: Request, res: Response): Promise<void> {
    const album: Album[] = await getRepository(Album).find();
        res.json(album);
}

export async function getAlbum(req: Request, res: Response): Promise<void> {
     const album: Album = await getRepository(Album).findOne(req.params.id, { relations: ["photos"] });
         res.json(album);
 }

 export async function addAlbum(req: Request, res: Response): Promise<any> {
     const album: any = getRepository(Album).create(req.body);
     const results: Album = await getRepository(Album).save(album);
     return res.json(results);
}

export async function updateAlbum(req: Request, res: Response): Promise<any> {
    const album: Album = await getRepository(Album).findOne(req.params.id, { relations: ["photos"] });
    getRepository(Album).merge(album, req.body);
    const results: Album = await getRepository(Album).save(album);
    return res.json(results);
}

export async function deleteAlbum(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Album).delete(req.params.id);
    return res.json(results);
}

export async function getAlbumByUser(req: Request, res: Response): Promise<any> {
      const album: Album[] = await getRepository(Album).find({ where: { authorId: req.params.authorId } });
      return res.json(album);
}