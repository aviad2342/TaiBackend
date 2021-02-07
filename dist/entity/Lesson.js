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
const Course_1 = require("./Course");
let Lesson = class Lesson extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Lesson.prototype, "videoId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Lesson.prototype, "videoURL", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", String)
], Lesson.prototype, "lessonNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Lesson.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Lesson.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Course_1.Course, course => course.lessons, { onDelete: "CASCADE" }),
    __metadata("design:type", Course_1.Course)
], Lesson.prototype, "course", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Lesson.prototype, "addId", null);
Lesson = __decorate([
    typeorm_1.Entity()
], Lesson);
exports.Lesson = Lesson;
//# sourceMappingURL=Lesson.js.map