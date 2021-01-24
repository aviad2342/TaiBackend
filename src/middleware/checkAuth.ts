import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkAuth: any = (req: Request, res: Response, next: NextFunction): any => {
  // get the jwt token from the head
  const token: string = <string>req.headers["auth"];
  let jwtPayload: any;

  // try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // if token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // the token is valid for 1 hour
  // send a new token on every request
  const { userId, email } = jwtPayload;
  const newToken: string = jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  // call the next middleware or controller
  next();
};