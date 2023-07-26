import { RequestHandler } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";

export const createCourse: RequestHandler = async function (req, res, next) {
  try {
    const { title, description, price, off, publicStatus } = req.body as {
      title: string;
      description: string;
      price: number;
      off: number;
      publicStatus: boolean;
    };
    const user_uid = req.user_uid;
    const course = await pool.query(
      "INSERT INTO courses (course_uid,title,description,price,off,user_uid,public_status) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [uuidv4(), title, description, price, off, user_uid, publicStatus]
    );
    if (course) {
      return res.status(200).json(course);
    }
    const error = new Error();
    error.message = "cant add new course pls try again";
    throw error;
  } catch (err) {
    next(err);
  }
};

export const deleteCourse: RequestHandler = async function (req, res, next) {
  const { course_uid } = req.params as { course_uid: string };
  const user_uid = req.user_uid;
  await pool.query(
    "DELETE FROM courses WHERE user_uid = $1 AND course_uid = $2",
    [user_uid, course_uid]
  );
  res.status(200).redirect("/admin/courses");
};

export const getCourses: RequestHandler = async function (req, res, next) {
  const user_uid = req.user_uid;
  const page = req.query.page || 1;
  const courses = await pool.query(
    "SELECT * FROM courses WHERE user_uid = $1 OFFSET $2 - 1 LIMIT 10 ",
    [user_uid, page]
  );
  res.status(200).json(courses.rows);
};

export const editCourse: RequestHandler = async function (req, res, next) {
  const { course_uid } = req.params as { course_uid: string };
  const user_uid = req.user_uid;
  const { title, description, price, off, publicStatus } = req.body as {
    title: string;
    description: string;
    price: number;
    off: number;
    publicStatus: boolean;
  };
  await pool.query(
    "UPDATE courses SET title = $1,description = $2,price = $3,off = $4,public_status = $5  WHERE course_uid = $6 AND user_uid = $7 ",
    [title, description, price, off, publicStatus, course_uid, user_uid]
  );
};
