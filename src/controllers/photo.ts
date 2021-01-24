import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Photo } from "../entity/Photo";


export async function getPhotos(req: Request, res: Response): Promise<void> {
    const photo: Photo[] = await getRepository(Photo).find();
        res.json(photo);
}

export async function getPhoto(req: Request, res: Response): Promise<void> {
     const photo: Photo = await getRepository(Photo).findOne(req.params.id);
         res.json(photo);
 }

 export async function addPhoto(req: Request, res: Response): Promise<any> {
     const photo: any = getRepository(Photo).create(req.body);
     const results: Photo = await getRepository(Photo).save(photo);
     return res.json(results);
}

export async function updatePhoto(req: Request, res: Response): Promise<any> {
    const photo: Photo = await getRepository(Photo).findOne(req.params.id, { relations: ["album"] });
    getRepository(Photo).merge(photo, req.body);
    const results: Photo = await getRepository(Photo).save(photo);
    return res.json(results);
}

export async function deletePhoto(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Photo).delete(req.params.id);
    return res.json(results);
}

export async function getPhotoAlbum(req: Request, res: Response): Promise<void> {
    const photo: Photo = await getRepository(Photo).findOne(req.params.id, { relations: ["album"] });
        res.json(photo.album);
}

export async function getAlbumPhotos(req: Request, res: Response): Promise<any> {
    const photo: Photo = await getRepository(Photo).findOne(req.params.id, { relations: ["album"] });
    const photos: Photo[] = await getRepository(Photo).find({ where: { album: photo.album } });
    return res.json(photos);
}