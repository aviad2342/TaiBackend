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
const Participant_1 = require("../entity/Participant");
const User_1 = require("../entity/User");
function getParticipants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participants = yield typeorm_1.getRepository(Participant_1.Participant).find();
        res.json(participants);
    });
}
exports.getParticipants = getParticipants;
function getEventParticipants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participants = yield typeorm_1.getRepository(Participant_1.Participant).find({ where: { event: req.params.eventId } });
        return res.json(participants);
    });
}
exports.getEventParticipants = getEventParticipants;
function getParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participant = yield typeorm_1.getRepository(Participant_1.Participant).findOne(req.params.id, { relations: ["speaker"] });
        res.json(participant);
    });
}
exports.getParticipant = getParticipant;
function addParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participant = typeorm_1.getRepository(Participant_1.Participant).create(req.body);
        const results = yield typeorm_1.getRepository(Participant_1.Participant).save(participant).catch(error => {
            const imagePhat = participant.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addParticipant = addParticipant;
function updateParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participant = yield typeorm_1.getRepository(Participant_1.Participant).findOne(req.params.id);
        typeorm_1.getRepository(Participant_1.Participant).merge(participant, req.body);
        const results = yield typeorm_1.getRepository(Participant_1.Participant).save(participant);
        return res.json(results);
    });
}
exports.updateParticipant = updateParticipant;
function deleteParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participant = yield typeorm_1.getRepository(Participant_1.Participant).findOne(req.params.id);
        const imagePhat = participant.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Participant_1.Participant).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteParticipant = deleteParticipant;
function getParticipantByEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participants = yield typeorm_1.getRepository(Participant_1.Participant).find({ where: { authorId: req.params.authorId } });
        return res.json(participants);
    });
}
exports.getParticipantByEvent = getParticipantByEvent;
function getUsersListToAdd(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const participantsQb = yield typeorm_1.getRepository(Participant_1.Participant)
            .createQueryBuilder("participant")
            .select("participant.id")
            .where("participant.eventId = :eventId", { eventId: req.params.eventId });
        const users = yield typeorm_1.getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.id NOT IN (" + participantsQb.getQuery() + ")")
            .setParameters(participantsQb.getParameters())
            .getMany();
        return res.json(users);
    });
}
exports.getUsersListToAdd = getUsersListToAdd;
//# sourceMappingURL=participant.js.map