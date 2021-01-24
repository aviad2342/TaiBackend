import {Router} from "express";

import * as CourseController from "../controllers/course";


const router: Router = Router();

router.get("/courses", CourseController.getCourses);

router.get("/course/:id", CourseController.getCourse);

router.get("/course/authorId/:authorId", CourseController.getCourseByUser);

router.post("/course", CourseController.addCourse);

router.put("/course/:id", CourseController.updateCourse);

router.delete("/course/:id", CourseController.deleteCourse);


export const courseRouter: Router = router;