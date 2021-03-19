import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult, Index} from "typeorm";
import {getRepository} from "typeorm";
import { Course } from "../entity/Course";
import { Lesson } from "../entity/Lesson";


export async function getLessons(req: Request, res: Response): Promise<void> {
    const lessons: Lesson[] = await getRepository(Lesson).find();
        res.json(lessons);
}

export async function getLesson(req: Request, res: Response): Promise<void> {
     const lesson: Lesson = await getRepository(Lesson).findOne(req.params.id, { relations: ["course"] });
         res.json(lesson);
 }

 export async function addLesson(req: Request, res: Response): Promise<any> {
     const lesson: any = getRepository(Lesson).create(req.body);
     const result: Lesson = await getRepository(Lesson).save(lesson);
     const newLesson: Lesson = await getRepository(Lesson).findOne(result.id, { relations: ["course"] });
     const course: Course = await getRepository(Course).findOne(newLesson.course.id);
     course.courseLessons = (+course.courseLessons + 1).toString();
     course.lastEdit = result.date;
     await getRepository(Course).save(course);
     return res.json(result);
}

export async function updateLesson(req: Request, res: Response): Promise<any> {
    const lesson: Lesson = await getRepository(Lesson).findOne(req.params.id, { relations: ["course"] });
    getRepository(Lesson).merge(lesson, req.body);
    const results: Lesson = await getRepository(Lesson).save(lesson);
    const course: Course = await getRepository(Course).findOne(lesson.course.id);
    course.lastEdit = new Date();
    await getRepository(Course).save(course);
    return res.json(results);
}

export async function deleteLesson(req: Request, res: Response): Promise<any> {
    const lesson: Lesson = await getRepository(Lesson).findOne(req.params.id, { relations: ["course"] });
    const lessonCourse: Course = lesson.course;
    const results: DeleteResult = await getRepository(Lesson).delete(req.params.id);
    const lessons: Lesson[] = await getRepository(Lesson).find({ where: { course: lessonCourse }, order: {lessonNumber: "ASC"}});
    lessons.forEach(async (lessonElement, index) => {
            lessonElement.lessonNumber = (index + 1).toString();
            await getRepository(Lesson).save(lessonElement);
    });
     const course: Course = await getRepository(Course).findOne(lesson.course.id);
     course.courseLessons = lessons.length.toString();
     course.lastEdit = new Date();
     await getRepository(Course).save(course);
    return res.json(results);
}

// export async function deleteLessons(req: Request, res: Response): Promise<any> {
//     const results: DeleteResult = await getRepository(Lesson).delete({course: req.params.course});
//     return res.json(results);
// }

export async function getCourseLessons(req: Request, res: Response): Promise<any> {
      const lessons: Lesson[] = await getRepository(Lesson).find({ where: { course: req.params.id }, order: {lessonNumber: "ASC"}});
      return res.json(lessons);
}

export async function getLessonsOfCourse(req: Request, res: Response): Promise<any> {
    const lesson: Lesson = await getRepository(Lesson).findOne(req.params.id, { relations: ["course"] });
    const lessons: Lesson[] = await getRepository(Lesson).find({ where: { course: lesson.course }, order: {lessonNumber: "ASC"}});
    return res.json(lessons);
}

export async function reorderLessons(req: Request, res: Response): Promise<any> {
    const fromLesson: Lesson = await getRepository(Lesson).findOne(req.params.fromId);
    const lessonNumber: string = fromLesson.lessonNumber;
    const toLesson: Lesson = await getRepository(Lesson).findOne(req.params.toId);
    fromLesson.lessonNumber = toLesson.lessonNumber;
    await getRepository(Lesson).save(fromLesson);
    toLesson.lessonNumber = lessonNumber;
    await getRepository(Lesson).save(toLesson);
    const lessons: Lesson[] = await getRepository(Lesson).find({ where: { course: fromLesson.course }, order: {lessonNumber: "ASC"}});
    return res.json(lessons);
}