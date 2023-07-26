import { Request, Response, NextFunction, Errback } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "../startup/db";

export default async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied. no token provide");
  const user_uid = jwt.verify(token, process.env.JWT_PRIVATE_KEY || "DEFAULT");
  if (!user_uid) {
    return res.status(401).send("access denied . token is not valid");
  }
  req.user_uid = user_uid.toString();
  next();
}
