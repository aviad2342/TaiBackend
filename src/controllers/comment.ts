import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import {Comment} from "../entity/Comment";


export async function getComments(req: Request, res: Response): Promise<void> {
    const comment: Comment[] = await getRepository(Comment).find();
        res.json(comment);
}

export async function getComment(req: Request, res: Response): Promise<void> {
     const comment: Comment = await getRepository(Comment).findOne(req.params.id);
         res.json(comment);
 }

 export async function addComment(req: Request, res: Response): Promise<any> {
     const comment: any = getRepository(Comment).create(req.body);
     const results: Comment = await getRepository(Comment).save(comment);
     return res.json(results);
}

export async function updateComment(req: Request, res: Response): Promise<any> {
    const comment: Comment = await getRepository(Comment).findOne(req.params.id);
    getRepository(Comment).merge(comment, req.body);
    const results: Comment = await getRepository(Comment).save(comment);
    return res.json(results);
}

export async function deleteComment(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Comment).delete(req.params.id);
    return res.json(results);
}

// export async function deleteComments(req: Request, res: Response): Promise<any> {
//     const results: DeleteResult = await getRepository(Comment).delete({articleId: req.params.articleId});
//     return res.json(results);
// }

export async function getArticleComments(req: Request, res: Response): Promise<any> {
    const comment: Comment = await getRepository(Comment).findOne(req.params.id, { relations: ["article"] });
    const comments: Comment[] = await getRepository(Comment).find({ where: { article: comment.article }, order: {date: "ASC"}});
    return res.json(comments);
}

export async function getCommentByUser(req: Request, res: Response): Promise<any> {
      const comment: Comment[] = await getRepository(Comment).find({ where: { authorId: req.params.authorId } });
      return res.json(comment);
}
