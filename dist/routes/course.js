"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CourseController = require("../controllers/course");
const router = express_1.Router();
router.get("/courses", CourseController.getCourses);
router.get("/course/:id", CourseController.getCourse);
router.get("/course/authorId/:authorId", CourseController.getCourseByUser);
router.post("/course", CourseController.addCourse);
router.put("/course/:id", CourseController.updateCourse);
router.delete("/course/:id", CourseController.deleteCourse);
exports.courseRouter = router;
//# sourceMappingURL=course.js.map