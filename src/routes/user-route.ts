import { Router } from "express";

import * as userController from "../controllers/user-controller";
import * as authentication from "../middlewares/authentication";
import * as authorization from "../middlewares/authorization";
import Role from "../utils/role";

const router: Router = Router();

router.use(authentication.authenticateByAccessToken);

router.get("/", authorization.authorizeByRole(Role.ADMIN), userController.getAll);
router.get("/:_id", authorization.authorizeByRole(...Role.ALL), userController.getById);

export default router;
