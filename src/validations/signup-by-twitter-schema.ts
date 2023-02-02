import Joi from "joi";

import IUser from "../interfaces/user-interface";

const signupByTwitterSchema: Joi.ObjectSchema<IUser> = Joi.object<IUser>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().lowercase().required(),
  role: Joi.string().valid("user", "admin").required(),
});

export default signupByTwitterSchema;
