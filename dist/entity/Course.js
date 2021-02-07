"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Lesson_1 = require("./Lesson");
let Course = class Course extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "authorId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "authorName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "catalogNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Course.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Course.prototype, "lastEdit", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Course.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", String)
], Course.prototype, "courseLessons", void 0);
__decorate([
    typeorm_1.OneToMany(type => Lesson_1.Lesson, lesson => lesson.course, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Course.prototype, "addId", null);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;
//# sourceMappingURL=Course.js.map