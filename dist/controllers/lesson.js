"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Course_1 = require("../entity/Course");
const Lesson_1 = require("../entity/Lesson");
function getLessons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lessons = yield typeorm_1.getRepository(Lesson_1.Lesson).find();
        res.json(lessons);
    });
}
exports.getLessons = getLessons;
function getLesson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.id, { relations: ["course"] });
        res.json(lesson);
    });
}
exports.getLesson = getLesson;
function addLesson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lesson = typeorm_1.getRepository(Lesson_1.Lesson).create(req.body);
        const result = yield typeorm_1.getRepository(Lesson_1.Lesson).save(lesson);
        const newLesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(result.id, { relations: ["course"] });
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(newLesson.course.id);
        course.courseLessons = (+course.courseLessons + 1).toString();
        course.lastEdit = result.date;
        yield typeorm_1.getRepository(Course_1.Course).save(course);
        return res.json(result);
    });
}
exports.addLesson = addLesson;
function updateLesson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.id, { relations: ["course"] });
        typeorm_1.getRepository(Lesson_1.Lesson).merge(lesson, req.body);
        const results = yield typeorm_1.getRepository(Lesson_1.Lesson).save(lesson);
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(lesson.course.id);
        course.lastEdit = new Date();
        yield typeorm_1.getRepository(Course_1.Course).save(course);
        return res.json(results);
    });
}
exports.updateLesson = updateLesson;
function deleteLesson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.id, { relations: ["course"] });
        const lessonCourse = lesson.course;
        const results = yield typeorm_1.getRepository(Lesson_1.Lesson).delete(req.params.id);
        const lessons = yield typeorm_1.getRepository(Lesson_1.Lesson).find({ where: { course: lessonCourse }, order: { lessonNumber: "ASC" } });
        lessons.forEach((lessonElement, index) => __awaiter(this, void 0, void 0, function* () {
            lessonElement.lessonNumber = (index + 1).toString();
            yield typeorm_1.getRepository(Lesson_1.Lesson).save(lessonElement);
        }));
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(lesson.course.id);
        course.courseLessons = lessons.length.toString();
        course.lastEdit = new Date();
        yield typeorm_1.getRepository(Course_1.Course).save(course);
        return res.json(results);
    });
}
exports.deleteLesson = deleteLesson;
// export async function deleteLessons(req: Request, res: Response): Promise<any> {
//     const results: DeleteResult = await getRepository(Lesson).delete({course: req.params.course});
//     return res.json(results);
// }
function getCourseLessons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lessons = yield typeorm_1.getRepository(Lesson_1.Lesson).find({ where: { course: req.params.id }, order: { lessonNumber: "ASC" } });
        return res.json(lessons);
    });
}
exports.getCourseLessons = getCourseLessons;
function getLessonsOfCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.id, { relations: ["course"] });
        const lessons = yield typeorm_1.getRepository(Lesson_1.Lesson).find({ where: { course: lesson.course }, order: { lessonNumber: "ASC" } });
        return res.json(lessons);
    });
}
exports.getLessonsOfCourse = getLessonsOfCourse;
function reorderLessons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fromLesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.fromId);
        const lessonNumber = fromLesson.lessonNumber;
        const toLesson = yield typeorm_1.getRepository(Lesson_1.Lesson).findOne(req.params.toId);
        fromLesson.lessonNumber = toLesson.lessonNumber;
        yield typeorm_1.getRepository(Lesson_1.Lesson).save(fromLesson);
        toLesson.lessonNumber = lessonNumber;
        yield typeorm_1.getRepository(Lesson_1.Lesson).save(toLesson);
        const lessons = yield typeorm_1.getRepository(Lesson_1.Lesson).find({ where: { course: fromLesson.course }, order: { lessonNumber: "ASC" } });
        return res.json(lessons);
    });
}
exports.reorderLessons = reorderLessons;
//# sourceMappingURL=lesson.js.map