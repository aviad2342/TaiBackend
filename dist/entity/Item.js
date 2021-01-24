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
var Category;
(function (Category) {
    Category["BOOKS"] = "\u05E1\u05E4\u05E8\u05D9\u05DD";
    Category["TREATMENTS"] = "\u05D8\u05D9\u05E4\u05D5\u05DC\u05D9\u05DD";
    Category["CONFERENCES"] = "\u05DB\u05E0\u05E1\u05D9\u05DD";
    Category["COURSES"] = "\u05E7\u05D5\u05E8\u05E1\u05D9\u05DD";
    Category["ARTICLES"] = "\u05DE\u05D0\u05DE\u05E8\u05D9\u05DD";
    Category["ACCESSORIES"] = "\u05D0\u05D1\u05D9\u05D6\u05E8\u05D9\u05DD";
    Category["OTHER"] = "\u05D0\u05D7\u05E8";
})(Category = exports.Category || (exports.Category = {}));
let Item = class Item extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "productId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "float" }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Item.prototype, "catalogNumber", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Category,
        default: Category.OTHER
    }),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
Item = __decorate([
    typeorm_1.Entity()
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map