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
const Cart_1 = require("./Cart");
const Item_1 = require("./Item");
let CartItem = class CartItem extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], CartItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "productId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "catalogNumber", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Item_1.Category,
        default: Item_1.Category.OTHER
    }),
    __metadata("design:type", String)
], CartItem.prototype, "category", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], CartItem.prototype, "itemId", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], CartItem.prototype, "units", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Cart_1.Cart, cart => cart.items, { onDelete: "CASCADE" }),
    __metadata("design:type", Cart_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartItem.prototype, "addId", null);
CartItem = __decorate([
    typeorm_1.Entity()
], CartItem);
exports.CartItem = CartItem;
//# sourceMappingURL=CartItem.js.map