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
let PasswordReset = class PasswordReset extends typeorm_1.BaseEntity {
    addId() {
        this.token = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], PasswordReset.prototype, "token", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], PasswordReset.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], PasswordReset.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], PasswordReset.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], PasswordReset.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], PasswordReset.prototype, "expirationDate", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PasswordReset.prototype, "emailSent", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PasswordReset.prototype, "success", void 0);
__decorate([
    typeorm_1.Column("boolean", { nullable: true }),
    __metadata("design:type", Boolean)
], PasswordReset.prototype, "activated", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PasswordReset.prototype, "addId", null);
PasswordReset = __decorate([
    typeorm_1.Entity()
], PasswordReset);
exports.PasswordReset = PasswordReset;
//# sourceMappingURL=PasswordReset.js.map