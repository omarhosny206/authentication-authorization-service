import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import passport from "passport";

import { connectToDb } from "./config/mongo-config";
import * as passportConfig from "./config/passport-config";
import * as errorHandler from "./middlewares/error-handler";
import * as notFoundHandler from "./middlewares/not-found-handler";
import loginRoute from "./routes/login-route";
import signupRoute from "./routes/signup-route";
import userRoute from "./routes/user-route";
import expiredAccessTokenHandlerRoute from "./routes/expired-access-token-handler-route";

dotenv.config();

const app: Express = express();
const PORT: string | undefined = process.env.PORT;

passportConfig.start();

app.use(cors<Request>());
app.use(express.json());
app.use(passport.initialize());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/users", userRoute);
app.use("/token", expiredAccessTokenHandlerRoute);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "hello mr mouse" });
});

app.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res.redirect("");
  });
});

app.use(notFoundHandler.handle);
app.use(errorHandler.handle);

app.listen(PORT, async () => {
  console.log("Server is running ....");
  await connectToDb();
});
