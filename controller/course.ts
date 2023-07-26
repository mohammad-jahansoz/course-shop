import { RequestHandler } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";

export const getCourses: RequestHandler = async function (req, res, next) {
  const courses = await pool.query(
    "SELECT * FROM courses WHERE public_status = true"
  );
  res.status(200).json(courses.rows);
};

export const setComment: RequestHandler = async function (req, res, next) {
  const user_uid = req.user_uid;
  const { course_uid, comment } = req.body as {
    course_uid: string;
    comment: string;
  };
  await pool.query(
    "INSERT INTO comments (comment_uid,comment,course_uid,user_uid) VALUES ($1,$2,$3,$4) ",
    [uuidv4(), comment, course_uid, user_uid]
  );
};
