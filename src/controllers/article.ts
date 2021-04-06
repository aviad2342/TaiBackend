import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import {Article} from "../entity/Article";
import * as fs from  "fs";
import { Item } from "../entity/Item";


export async function getArticles(req: Request, res: Response): Promise<void> {
    const article: Article[] = await getRepository(Article).find();
    res.json(article);
}

export async function getArticle(req: Request, res: Response): Promise<void> {
     const article: Article = await getRepository(Article).findOne(req.params.id, { relations: ["comments"] });
     res.json(article);
 }

 export async function viewArticle(req: Request, res: Response): Promise<void> {
    const article: Article = await getRepository(Article).findOne(req.params.id, { relations: ["comments"] });
    article.views++;
    await getRepository(Article).save(article);
    res.json(article);
}

 export async function addArticle(req: Request, res: Response): Promise<any> {
     const article: any = getRepository(Article).create(req.body);
     const results: Article = await getRepository(Article).save(article).catch( error => {
        const imagePhat: string = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        const pdfPhat: string = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        if(fs.existsSync(pdfPhat)) {
            fs.unlinkSync(pdfPhat);
        }
     });
     return res.json(results);
}

export async function updateArticle(req: Request, res: Response): Promise<any> {
    const article: Article = await getRepository(Article).findOne(req.params.id);
    if(article.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    if(article.pdf !== req.body.pdf) {
        const pdfPhat: string = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(pdfPhat)) {
            fs.unlinkSync(pdfPhat);
        }
    }

    let result: Article;
    try {
        getRepository(Article).merge(article, req.body);
        result = await getRepository(Article).save(article);
    } catch(error) {
        const imagePhat: string = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        const pdfPhat: string = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        if(fs.existsSync(pdfPhat)) {
            fs.unlinkSync(pdfPhat);
        }
    }

    const item: Item = await getRepository(Item).findOne({ where: { productId: result.id } });
    if(typeof item !== undefined) {
        if(item.name !== result.title || item.description !== result.subtitle || item.thumbnail !== result.thumbnail) {
            if(item.name !== result.title) {
                item.name = result.title;
            }
            if(item.description !== result.subtitle ) {
                item.description = result.subtitle ;
            }
            if(item.thumbnail !== result.thumbnail) {
                item.thumbnail = result.thumbnail;
            }
            await getRepository(Item).save(item);
        }
    }

    return res.json(result);
}


export async function addArticlePdf(req: Request, res: Response): Promise<any> {
    const url: string = req.protocol + "://" + req.get("host") + "/articles/" + req.file.filename;
    return res.json({fileUrl: url});
}

export async function deleteArticle(req: Request, res: Response): Promise<any> {
    const article: Article = await getRepository(Article).findOne(req.params.id);
    const imagePhat: string = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    const pdfPhat: string = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    if(fs.existsSync(pdfPhat)) {
        fs.unlinkSync(pdfPhat);
    }
    const item: Item = await getRepository(Item).findOne({ where: { productId: article.id } });
    if(typeof item !== undefined) {
        await getRepository(Item).delete(item.id);
    }
    const results: DeleteResult = await getRepository(Article).delete(req.params.id);
    return res.json(results);
}

export async function getArticleByUser(req: Request, res: Response): Promise<any> {
      const article: Article[] = await getRepository(Article).find({ where: { authorId: req.params.authorId } });
      return res.json(article);
}


