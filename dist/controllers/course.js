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
const fs = require("fs");
function getCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield typeorm_1.getRepository(Course_1.Course).find();
        res.json(courses);
    });
}
exports.getCourses = getCourses;
function getCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(req.params.id, { relations: ["lessons"] });
        if (course.lessons) {
            course.lessons = course.lessons.sort((a, b) => {
                return (+a.lessonNumber) - (+b.lessonNumber);
            });
        }
        res.json(course);
    });
}
exports.getCourse = getCourse;
function addCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = typeorm_1.getRepository(Course_1.Course).create(req.body);
        const results = yield typeorm_1.getRepository(Course_1.Course).save(course).catch(error => {
            const imagePhat = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addCourse = addCourse;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(req.params.id);
        if (course.thumbnail !== req.body.thumbnail) {
            const imagePhat = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Course_1.Course).merge(course, req.body);
        const results = yield typeorm_1.getRepository(Course_1.Course).save(course);
        return res.json(results);
    });
}
exports.updateCourse = updateCourse;
function updateCourseAndThumbnail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(req.params.id);
        const imagePhat = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        typeorm_1.getRepository(Course_1.Course).merge(course, req.body);
        const results = yield typeorm_1.getRepository(Course_1.Course).save(course);
        return res.json(results);
    });
}
exports.updateCourseAndThumbnail = updateCourseAndThumbnail;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield typeorm_1.getRepository(Course_1.Course).findOne(req.params.id);
        const imagePhat = course.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Course_1.Course).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCourse = deleteCourse;
function getCourseByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield typeorm_1.getRepository(Course_1.Course).find({ where: { authorId: req.params.authorId } });
        return res.json(courses);
    });
}
exports.getCourseByUser = getCourseByUser;
//# sourceMappingURL=course.js.map