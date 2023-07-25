import { Request, Response, NextFunction, Errback } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    await pool.query(
      "INSERT INTO users (user_uid,email,password) VALUES ($1,$2,$3) ",
      [uuidv4(), email, password]
    );
  } catch (err) {
    next(err);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = (
      await pool.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1",
        [email, password]
      )
    ).rows[0];

    const token = jwt.sign(
      user.user_uid,
      process.env.JWT_PRIVATE_KEY || "DEFAULT"
    );
    console.log(token);
    res.setHeader("x-auth-token", token).redirect("/");
  } catch (err) {
    next(err);
  }
}

export function test(req: Request, res: Response, next: NextFunction) {}
