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

declare module "express-serve-static-core" {
  export interface Request {
    user: { user_uid: string; email: string };
  }
}

const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(isAuth);
app.use(authRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction) => {});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
