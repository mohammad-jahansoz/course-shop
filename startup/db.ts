import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "course_shop",
  port: 5432,
});

export default pool;
