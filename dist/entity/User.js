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
const bcrypt = require("bcrypt");
const Preferences_1 = require("./Preferences");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
const UserAddress_1 = require("./UserAddress");
let User = class User extends typeorm_1.BaseEntity {
    addId() {
        this.id = uuid_1.v4();
    }
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], User.prototype, "date", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    typeorm_1.OneToOne(type => UserAddress_1.UserAddress, { onUpdate: "CASCADE", cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", UserAddress_1.UserAddress)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToOne(type => Preferences_1.Preferences, { nullable: true, onUpdate: "CASCADE", cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Preferences_1.Preferences)
], User.prototype, "preferences", void 0);
__decorate([
    typeorm_1.Column("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "savedVideos", void 0);
__decorate([
    typeorm_1.OneToOne(type => Cart_1.Cart, { nullable: true, onUpdate: "CASCADE", cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Cart_1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    typeorm_1.OneToMany(type => Order_1.Order, order => order.user, { nullable: true, onUpdate: "CASCADE", cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "addId", null);
User = __decorate([
    typeorm_1.Entity(),
    typeorm_1.TableInheritance({ column: { type: "varchar", name: "type" } })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map