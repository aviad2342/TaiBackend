"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestimonyController = require("../controllers/testimony");
const router = express_1.Router();
router.get("/testimonies", TestimonyController.getTestimonies);
router.get("/testimony/:id", TestimonyController.getTestimony);
router.post("/testimony", TestimonyController.addTestimony);
router.put("/testimony/:id", TestimonyController.updateTestimony);
router.delete("/testimony/:id", TestimonyController.deleteTestimony);
exports.testimonyRouter = router;
//# sourceMappingURL=testimony.js.map