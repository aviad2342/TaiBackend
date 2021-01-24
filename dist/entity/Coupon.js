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
const CouponCustomers_1 = require("./CouponCustomers");
let Coupon = class Coupon {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Coupon.prototype, "expirationDate", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Coupon.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], Coupon.prototype, "singleItem", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Coupon.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Coupon.prototype, "itemId", void 0);
__decorate([
    typeorm_1.OneToMany(type => CouponCustomers_1.CouponCustomers, customer => customer.coupon, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Coupon.prototype, "customers", void 0);
Coupon = __decorate([
    typeorm_1.Entity()
], Coupon);
exports.Coupon = Coupon;
//# sourceMappingURL=Coupon.js.map