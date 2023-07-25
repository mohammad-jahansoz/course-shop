import { RequestHandler } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const signup: RequestHandler = async function (req, res, next) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await pool.query(
      "INSERT INTO users (user_uid,email,password) VALUES ($1,$2,$3)",
      [uuidv4(), email, password]
    );
    console.log(result);
  } catch (err) {
    next(err);
  }
};

export const signin: RequestHandler = async function (req, res, next) {
  try {
    const { email, password } = req.body as { email: string; password: string };
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
    res.setHeader("x-auth-token", token).redirect("/");
  } catch (err) {
    next(err);
  }
};
