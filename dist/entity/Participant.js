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
const Event_1 = require("./Event");
let Participant = class Participant extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Participant.prototype, "picture", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Event_1.Event, event => event.participants, { onDelete: "CASCADE" }),
    __metadata("design:type", Event_1.Event)
], Participant.prototype, "event", void 0);
Participant = __decorate([
    typeorm_1.Entity()
], Participant);
exports.Participant = Participant;
//# sourceMappingURL=Participant.js.map