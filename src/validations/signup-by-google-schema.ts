import Joi from "joi";

import IUser from "../interfaces/user-interface";
import Role from "../utils/role";

const signupByGoogleSchema: Joi.ObjectSchema<IUser> = Joi.object<IUser>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  role: Joi.string().valid("user", "admin").required(),
});

export default signupByGoogleSchema;
