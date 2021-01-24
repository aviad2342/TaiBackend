import {Router} from "express";

import * as LessonController from "../controllers/lesson";


const router: Router = Router();

router.get("/lessons", LessonController.getLessons);

router.get("/lesson/:id", LessonController.getLesson);

router.get("/lesson/course/:id", LessonController.getCourseLessons);

router.get("/lesson/lessons/:id", LessonController.getLessonsOfCourse);

router.get("/lesson/reorder/:fromId/:toId", LessonController.reorderLessons);

router.post("/lesson", LessonController.addLesson);

router.put("/lesson/:id", LessonController.updateLesson);

router.delete("/lesson/:id", LessonController.deleteLesson);

// router.delete("/lesson/courseId/:course", LessonController.deleteLessons);


export const lessonRouter: Router = router;