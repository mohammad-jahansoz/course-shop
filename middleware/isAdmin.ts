import { Request, Response, NextFunction, Errback } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "../startup/db";

export default async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (token) {
    const user_uid = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY || "DEFAULT"
    );
    if (user_uid) {
      const user = (
        await pool.query(
          "SELECT user_uid,email,is_admin FROM users WHERE user_uid = $1 AND is_admin = $2 LIMIT 1",
          [user_uid, true]
        )
      ).rows[0];
      if (!user) {
        return res.status(401).send("SHOULD BE ADMIN FOR ACCESS THIS PAGE");
      }
    } else {
      return res.status(401).send("access denied. no token provide");
    }
    req.user_uid = user_uid.toString();
    next();
  }
}
