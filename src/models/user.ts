import { model, Schema } from "mongoose";

import IUser from "../interfaces/user-interface";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 8, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
  },
  {
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
