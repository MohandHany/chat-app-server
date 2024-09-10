import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import dbConnect from "./constants/db";
import userController from "./controller/user/userControllers";
import { errorHandler, notFound } from "./middlewares/errorHandling";
import imageController from "./controller/image/imageControllers";

configDotenv();
dbConnect();

const app: Application = express();
const PORT: number = 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/user", userController);
app.use("/api/upload", imageController);

app.use(notFound);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(req, res, next, err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
