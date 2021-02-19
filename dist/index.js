"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const typeorm_1 = require("typeorm");
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const upload_1 = require("./routes/upload");
const article_1 = require("./routes/article");
const course_1 = require("./routes/course");
const comment_1 = require("./routes/comment");
const album_1 = require("./routes/album");
const photo_1 = require("./routes/photo");
const event_1 = require("./routes/event");
const speaker_1 = require("./routes/speaker");
const address_1 = require("./routes/address");
const item_1 = require("./routes/item");
const lesson_1 = require("./routes/lesson");
const participant_1 = require("./routes/participant");
const articleBodyImages_1 = require("./routes/articleBodyImages");
const therapist_1 = require("./routes/therapist");
const treatment_1 = require("./routes/treatment");
const order_1 = require("./routes/order");
const customer_1 = require("./routes/customer");
const cart_1 = require("./routes/cart");
const cartItem_1 = require("./routes/cartItem");
const coupon_1 = require("./routes/coupon");
typeorm_1.createConnection().then(connection => {
    // create and setup express app
    const app = express();
    // the port the express app will listen on
    const port = process.env.PORT || "3000";
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static("src"));
    app.use("/images", express.static(path.join("TaiBackend/src/images")));
    app.use("/userImages", express.static(path.join("TaiBackend/src/userImages")));
    app.use("/therapistImages", express.static(path.join("TaiBackend/src/therapistImages")));
    app.use("/treatmentImages", express.static(path.join("TaiBackend/src/treatmentImages")));
    app.use("/articleImages", express.static(path.join("TaiBackend/src/articleImages")));
    app.use("/itemImages", express.static(path.join("TaiBackend/src/itemImages")));
    app.use("/articles", express.static(path.join("TaiBackend/src/articles")));
    app.use("/articleBodyImages", express.static(path.join("TaiBackend/src/articleBodyImages")));
    app.use("/speakerImages", express.static(path.join("TaiBackend/src/speakerImages")));
    app.use("/participantImages", express.static(path.join("TaiBackend/src/participantImages")));
    app.use("/courseImages", express.static(path.join("TaiBackend/src/courseImages")));
    app.use("/eventImages", express.static(path.join("TaiBackend/src/eventImages")));
    app.use("/assets", express.static(path.join("TaiBackend/src/assets")));
    app.use("/api/user", user_1.userRouter);
    app.use("/api/register", user_1.userRouter);
    app.use("/api/therapist", therapist_1.therapistRouter);
    app.use("/api/customer", customer_1.customerRouter);
    app.use("/api/treatment", treatment_1.treatmentRouter);
    app.use("/api/auth", auth_1.authRouter);
    app.use("/api/item", item_1.itemRouter);
    app.use("/api/order", order_1.orderRouter);
    app.use("/api/cart", cart_1.cartRouter);
    app.use("/api/cartItem", cartItem_1.cartItemRouter);
    app.use("/api/coupon", coupon_1.couponRouter);
    app.use("/api/article", article_1.articleRouter);
    app.use("/api/course", course_1.courseRouter);
    app.use("/api/lesson", lesson_1.lessonRouter);
    app.use("/api/comment", comment_1.commentRouter);
    app.use("/api/event", event_1.eventRouter);
    app.use("/api/speaker", speaker_1.speakerRouter);
    app.use("/api/participant", participant_1.participantRouter);
    app.use("/api/image", upload_1.uploadRouter);
    app.use("/api/address", address_1.addressRouter);
    app.use("/api/album", album_1.albumRouter);
    app.use("/api/photo", photo_1.photoRouter);
    app.use("/articleBodyImages", articleBodyImages_1.articleBodyImagesRouter);
    // https.createServer({
    //   key: fs.readFileSync(path.resolve("./security/cert.key")),
    //   cert: fs.readFileSync(path.resolve("./security/cert.pem"))}
    //   , app).listen(3000, () => {
    //   console.log("Example app listening on port 3000! Go to https://localhost:3000/");
    // });
    // serve the application at the given port
    app.listen(port, () => {
        // success callback
        // tslint:disable-next-line: no-console
        console.log(`Listening at http://localhost:${port}/`);
    });
    // tslint:disable-next-line: no-console
}).catch(error => console.log(error));
// export const myapp: express.Application = app;
//# sourceMappingURL=index.js.map