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
const Item_1 = require("./Item");
const Order_1 = require("./Order");
let OrderItem = class OrderItem {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "catalogNumber", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Item_1.Category,
        default: Item_1.Category.OTHER
    }),
    __metadata("design:type", String)
], OrderItem.prototype, "category", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], OrderItem.prototype, "itemId", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "units", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Order_1.Order, order => order.items, { onDelete: "CASCADE" }),
    __metadata("design:type", Order_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderItem.prototype, "addId", null);
OrderItem = __decorate([
    typeorm_1.Entity()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map