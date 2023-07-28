import { RequestHandler } from "express";
import pool from "../startup/db";
import { v4 as uuidv4 } from "uuid";

export const getCourses: RequestHandler = async function (req, res, next) {
  const courses = await pool.query(
    "SELECT * FROM courses WHERE public_status = true "
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

export const getCourse: RequestHandler = async function (req, res, next) {
  const { course_uid } = req.params as { course_uid: string };

  const course = await pool.query(
    "SELECT * FROM courses WHERE course_uid = $1 LIMIT 1",
    [course_uid]
  );
  // "SELECT * FROM seasons JOIN episodes ON seasons.course_uid = episodes.course_uid WHERE seasons.course_uid = $1 ",

  // const seasonsAndEpisodes = await pool.query(
  //   "SELECT seasons.*,episodes.* FROM seasons LEFT JOIN episodes ON seasons.season_uid = episodes.season_uid WHERE seasons.course_uid = $1",
  //   [course_uid]
  // );
  const seasonsAndEpisodes = await pool.query(
    "SELECT episodes.*,seasons.title AS season_name FROM episodes FULL JOIN seasons ON seasons.season_uid = episodes.season_uid WHERE seasons.course_uid = $1 ",
    [course_uid]
  );

  const comments = await pool.query(
    "SELECT comments.comment_uid , comments.comment , comments.reply , users.user_uid , users.email FROM comments JOIN users ON comments.user_uid = users.user_uid AND comments.public_status = true WHERE course_uid = $1 ",
    [course_uid]
  );
  res.status(200).json({
    course: course.rows[0],
    comments: comments.rows,
    seasonsAndEpisodes: seasonsAndEpisodes.rows,
  });
};
