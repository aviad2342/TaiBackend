import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Course } from "../entity/Course";
import * as fs from  "fs";


export async function getCourses(req: Request, res: Response): Promise<void> {
    const courses: Course[] = await getRepository(Course).find();
        res.json(courses);
}

export async function getCourse(req: Request, res: Response): Promise<void> {
     const course: Course = await getRepository(Course).findOne(req.params.id, { relations: ["lessons"] });
     if(course.lessons) {
        course.lessons = course.lessons.sort((a, b) => {
            return (+a.lessonNumber) - (+b.lessonNumber);
        });
     }
         res.json(course);
 }

 export async function addCourse(req: Request, res: Response): Promise<any> {
     const course: any = getRepository(Course).create(req.body);
     const results: Course = await getRepository(Course).save(course).catch( error => {
        const imagePhat: string = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if(fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
     });
     return res.json(results);
}

export async function updateCourse(req: Request, res: Response): Promise<any> {
    const course: Course = await getRepository(Course).findOne(req.params.id);
    if(course.thumbnail !== req.body.thumbnail) {
        const imagePhat: string = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    }
    getRepository(Course).merge(course, req.body);
    const results: Course = await getRepository(Course).save(course);
    return res.json(results);
}

export async function updateCourseAndThumbnail(req: Request, res: Response): Promise<any> {
    const course: Course = await getRepository(Course).findOne(req.params.id);
    const imagePhat: string = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    getRepository(Course).merge(course, req.body);
    const results: Course = await getRepository(Course).save(course);
    return res.json(results);
}

export async function deleteCourse(req: Request, res: Response): Promise<any> {
    const course: Course = await getRepository(Course).findOne(req.params.id);
    const imagePhat: string = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
    if(fs.existsSync(imagePhat)) {
        fs.unlinkSync(imagePhat);
    }
    const results: DeleteResult = await getRepository(Course).delete(req.params.id);
    return res.json(results);
}

export async function getCourseByUser(req: Request, res: Response): Promise<any> {
      const courses: Course[] = await getRepository(Course).find({ where: { authorId: req.params.authorId } });
      return res.json(courses);
}