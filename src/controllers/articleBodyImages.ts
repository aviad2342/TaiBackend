import {Request, Response} from "express";

export async function uploadArticleBodyImage(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/articleBodyImages/" + req.file.filename;
    res.send({imageUrl: url});
}