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
class Address {
    addId() {
        this.id = uuid_1.v4();
    }
}
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Address.prototype, "houseNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Address.prototype, "apartment", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Address.prototype, "entry", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Address.prototype, "addId", null);
exports.Address = Address;
//# sourceMappingURL=Address.js.map