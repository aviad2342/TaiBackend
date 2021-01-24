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
const Customer_1 = require("./Customer");
const deliveryAddress_1 = require("./deliveryAddress");
const OrderItem_1 = require("./OrderItem");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
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
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Order.prototype, "confirmPaymentNumber", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Customer_1.Customer, customer => customer.orders, { onDelete: "CASCADE" }),
    __metadata("design:type", Customer_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    typeorm_1.OneToOne(() => deliveryAddress_1.DeliveryAddress, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", deliveryAddress_1.DeliveryAddress)
], Order.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(type => OrderItem_1.OrderItem, orderItem => orderItem.order, { onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map