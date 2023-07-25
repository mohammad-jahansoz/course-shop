import { RequestHandler } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";

export const createCourse: RequestHandler = async function (req, res, next) {
  const { title, description, price, off, publicStatus } = req.body as {
    title: string;
    description: string;
    price: number;
    off: number;
    publicStatus: boolean;
  };
  const user_uid = req.user_uid;
  console.log(user_uid);
  const course = await pool.query(
    "INSERT INTO courses (course_uid,title,description,price,off,user_uid,public_status) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [uuidv4(), title, description, price, off, user_uid, publicStatus]
  );
};
