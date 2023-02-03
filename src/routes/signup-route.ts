import { Router } from "express";

import * as signupController from "../controllers/signup-controller";
import * as validator from "../middlewares/validator";
import signupByGoogleSchema from "../validations/signup-by-google-schema";
import signupSchema from "../validations/signup-schema";
import signupByGithubSchema from "../validations/signup-by-github-schema";
import signupByLinkedinSchema from "../validations/signup-by-linkedin-schema";

const router: Router = Router();

router.post("/", validator.validate(signupSchema), signupController.signup);
router.post("/google", validator.validate(signupByGoogleSchema), signupController.signupByProviders);
router.post("/github", validator.validate(signupByGithubSchema), signupController.signupByProviders);
router.post("/twitter", validator.validate(signupByGithubSchema), signupController.signupByProviders);
router.post("/linkedin", validator.validate(signupByLinkedinSchema), signupController.signupByProviders);

export default router;
