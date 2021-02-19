import * as express from "express";
import "reflect-metadata";
import * as path from  "path";
import * as bodyParser from  "body-parser";
import * as cors from "cors";
import {createConnection, Connection,Repository} from "typeorm";
import { authRouter } from "./routes/auth";
import {userRouter} from "./routes/user";
import {uploadRouter} from "./routes/upload";
import {articleRouter} from "./routes/article";
import {courseRouter} from "./routes/course";
import {commentRouter} from "./routes/comment";
import {albumRouter} from "./routes/album";
import {photoRouter} from "./routes/photo";
import {eventRouter} from "./routes/event";
import {speakerRouter} from "./routes/speaker";
import * as http from "http";
import * as https from "https";
import { addressRouter } from "./routes/address";
import { itemRouter } from "./routes/item";
import { lessonRouter } from "./routes/lesson";
import { participantRouter } from "./routes/participant";
import { articleBodyImagesRouter } from "./routes/articleBodyImages";
import { therapistRouter } from "./routes/therapist";
import { treatmentRouter } from "./routes/treatment";
import { orderRouter } from "./routes/order";
import { customerRouter } from "./routes/customer";
import { cartRouter } from "./routes/cart";
import { cartItemRouter } from "./routes/cartItem";
import { couponRouter } from "./routes/coupon";
import { registrationRouter } from "./routes/register";


createConnection().then(connection => {

    // create and setup express app
    const app: express.Application = express();
   // the port the express app will listen on
    const port: string = process.env.PORT || "3000";

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


    app.use("/api/user",userRouter);
    app.use("/api/register",registrationRouter);
    app.use("/api/therapist",therapistRouter);
    app.use("/api/customer",customerRouter);
    app.use("/api/treatment",treatmentRouter);
    app.use("/api/auth",authRouter);
    app.use("/api/item",itemRouter);
    app.use("/api/order",orderRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/cartItem", cartItemRouter);
    app.use("/api/coupon", couponRouter);
    app.use("/api/article",articleRouter);
    app.use("/api/course",courseRouter);
    app.use("/api/lesson",lessonRouter);
    app.use("/api/comment",commentRouter);
    app.use("/api/event",eventRouter);
    app.use("/api/speaker",speakerRouter);
    app.use("/api/participant",participantRouter);
    app.use("/api/image",uploadRouter);
    app.use("/api/address",addressRouter);
    app.use("/api/album",albumRouter);
    app.use("/api/photo",photoRouter);
    app.use("/articleBodyImages",articleBodyImagesRouter);


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