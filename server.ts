import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import bodyParser from "body-parser";
import path from "path";

const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
