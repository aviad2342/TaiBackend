"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const fs = require("fs");
const Event_1 = require("../entity/Event");
const Item_1 = require("../entity/Item");
function getEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield typeorm_1.getRepository(Event_1.Event).find();
        res.json(events);
    });
}
exports.getEvents = getEvents;
function getEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id, { relations: ["speakers", "participants"] });
        res.json(event);
    });
}
exports.getEvent = getEvent;
function addEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = typeorm_1.getRepository(Event_1.Event).create(req.body);
        const results = yield typeorm_1.getRepository(Event_1.Event).save(event).catch(error => {
            const imagePhat = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addEvent = addEvent;
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        if (event.thumbnail !== req.body.thumbnail) {
            const imagePhat = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Event_1.Event).merge(event, req.body);
        const results = yield typeorm_1.getRepository(Event_1.Event).save(event);
        return res.json(results);
    });
}
exports.updateEvent = updateEvent;
function updateEventAndThumbnail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        const imagePhat = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        typeorm_1.getRepository(Event_1.Event).merge(event, req.body);
        const results = yield typeorm_1.getRepository(Event_1.Event).save(event);
        return res.json(results);
    });
}
exports.updateEventAndThumbnail = updateEventAndThumbnail;
function updateEventImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        event.images.push(...req.body.images);
        const result = yield typeorm_1.getRepository(Event_1.Event).save(event);
        return res.json(result);
    });
}
exports.updateEventImages = updateEventImages;
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        const imagePhat = event.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const item = yield typeorm_1.getRepository(Item_1.Item).findOne({ where: { productId: event.id } });
        if (item) {
            yield typeorm_1.getRepository(Item_1.Item).delete(item.id);
        }
        const results = yield typeorm_1.getRepository(Event_1.Event).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteEvent = deleteEvent;
function removeEventImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        const image = req.body.image;
        const imagePhat = image.split("http://aviadbenhayun.com:3000/");
        if (fs.existsSync("./src/" + imagePhat[1])) {
            fs.unlinkSync("./src/" + imagePhat[1]);
        }
        event.images.splice(event.images.indexOf(image), 1);
        const result = yield typeorm_1.getRepository(Event_1.Event).save(event);
        return res.json(result);
    });
}
exports.removeEventImage = removeEventImage;
function deleteEventImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        const images = [];
        images.push(...req.body);
        images.forEach(image => {
            const imagePhat = image.split("http://localhost:3000/");
            if (fs.existsSync("./src/" + imagePhat[1])) {
                fs.unlinkSync("./src/" + imagePhat[1]);
            }
            event.images.splice(event.images.indexOf(image), 1);
        });
        const result = yield typeorm_1.getRepository(Event_1.Event).save(event);
        return res.json(result);
    });
}
exports.deleteEventImages = deleteEventImages;
function getEventeByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield typeorm_1.getRepository(Event_1.Event).find({ where: { authorId: req.params.authorId } });
        return res.json(events);
    });
}
exports.getEventeByUser = getEventeByUser;
function getEventImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield typeorm_1.getRepository(Event_1.Event).findOne(req.params.id);
        return res.json(event.images);
    });
}
exports.getEventImages = getEventImages;
//# sourceMappingURL=event.js.map