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
const Event_1 = require("./Event");
let Speaker = class Speaker extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Speaker.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Speaker.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Speaker.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Speaker.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Speaker.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Speaker.prototype, "picture", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Event_1.Event, event => event.speakers, { onDelete: "CASCADE" }),
    __metadata("design:type", Event_1.Event)
], Speaker.prototype, "event", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Speaker.prototype, "addId", null);
Speaker = __decorate([
    typeorm_1.Entity()
], Speaker);
exports.Speaker = Speaker;
//# sourceMappingURL=Speaker.js.map