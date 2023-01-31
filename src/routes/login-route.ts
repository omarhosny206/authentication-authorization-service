import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";

import * as loginController from "../controllers/login-controller";
import * as googleAuthentication from "../middlewares/google-authentication";
import * as validator from "../middlewares/validator";
import loginRequestSchema from "../validations/login-request-schema";

const router: Router = Router();
const authenticateOptions: AuthenticateOptions = { scope: ["profile", "email"], session: false };
const handlingAuthenticateOptions: AuthenticateOptions = { session: false };

router.post("/", validator.validate(loginRequestSchema), loginController.login);
router.get("/google", passport.authenticate("google", authenticateOptions));
router.get("/google/callback", passport.authenticate("google", handlingAuthenticateOptions), googleAuthentication.handleAuthenticatedUser);

export default router;
