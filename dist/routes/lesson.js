"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LessonController = require("../controllers/lesson");
const router = express_1.Router();
router.get("/lessons", LessonController.getLessons);
router.get("/lesson/:id", LessonController.getLesson);
router.get("/lesson/course/:id", LessonController.getCourseLessons);
router.get("/lesson/lessons/:id", LessonController.getLessonsOfCourse);
router.get("/lesson/reorder/:fromId/:toId", LessonController.reorderLessons);
router.post("/lesson", LessonController.addLesson);
router.put("/lesson/:id", LessonController.updateLesson);
router.delete("/lesson/:id", LessonController.deleteLesson);
// router.delete("/lesson/courseId/:course", LessonController.deleteLessons);
exports.lessonRouter = router;
//# sourceMappingURL=lesson.js.map