import { Router } from "express";

import * as loginController from "../controllers/login-controller";
import * as googleAuthentication from "../middlewares/google-authentication";
import * as githubAuthentication from "../middlewares/github-authentication";
import * as twitterAuthentication from "../middlewares/twitter-authentication";
import * as linkedinAuthentication from "../middlewares/linkedin-authentication";
import * as validator from "../middlewares/validator";
import loginRequestSchema from "../validations/login-request-schema";

const router: Router = Router();

router.post("/", validator.validate(loginRequestSchema), loginController.login);
router.post("/google", googleAuthentication.authenticateByAccessToken);
router.post("/github", githubAuthentication.authenticateByAccessToken);
router.post("/twitter", twitterAuthentication.authenticateByAccessToken);
router.post("/linkedin", linkedinAuthentication.authenticateByAccessToken);

export default router;
