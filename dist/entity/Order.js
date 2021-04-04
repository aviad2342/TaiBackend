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
const deliveryAddress_1 = require("./deliveryAddress");
const OrderItem_1 = require("./OrderItem");
const User_1 = require("./User");
let Order = class Order {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Order.prototype, "cartId", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], Order.prototype, "delivery", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Order.prototype, "couponCode", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], Order.prototype, "totalItems", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], Order.prototype, "totalPayment", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], Order.prototype, "receivedPayment", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "confirmPaymentNumber", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.orders, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToOne(() => deliveryAddress_1.DeliveryAddress, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", deliveryAddress_1.DeliveryAddress)
], Order.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => OrderItem_1.OrderItem, orderItem => orderItem.order, { nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Order.prototype, "addId", null);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map