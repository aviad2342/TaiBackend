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
const Participant_1 = require("./Participant");
const Speaker_1 = require("./Speaker");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("date"),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Event.prototype, "beginsAt", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Event.prototype, "endsAt", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Event.prototype, "maxCapacity", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "placeName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "street", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "houseNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "apartment", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "entry", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Event.prototype, "catalogNumber", void 0);
__decorate([
    typeorm_1.Column("simple-array"),
    __metadata("design:type", Array)
], Event.prototype, "images", void 0);
__decorate([
    typeorm_1.OneToMany(type => Participant_1.Participant, participant => participant.event, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Event.prototype, "participants", void 0);
__decorate([
    typeorm_1.OneToMany(type => Speaker_1.Speaker, speaker => speaker.event, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Event.prototype, "speakers", void 0);
Event = __decorate([
    typeorm_1.Entity()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map