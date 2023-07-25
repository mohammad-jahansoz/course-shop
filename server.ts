import { config } from "dotenv";
config();
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import bodyParser from "body-parser";
import path from "path";
import authRoutes from "./routes/auth";
import jwt from "jsonwebtoken";
import isAuth from "./middleware/isAuth";
import checkUser from "./middleware/check-user";

// declare module "express-serve-static-core" {
//   export interface Request {
//     user: { user_uid: string; email: string };
//   }
// }
declare module "express-serve-static-core" {
  export interface Request {
    user_uid: string;
    // user: { user_uid: string; email: string };
  }
}

const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (token) {
    const user_uid = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY || "DEFAULT"
    );
    console.log(user_uid);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
