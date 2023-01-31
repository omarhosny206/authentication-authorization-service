import bcrypt from "bcrypt";

import ILoginRequest from "../interfaces/login-request-interface";
import ILoginResponse from "../interfaces/login-response-interface";
import * as userService from "../services/user-service";
import ApiError from "../utils/api-error";
import * as jwt from "../utils/jwt";

export const login = async (loginRequest: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const { email, password } = loginRequest;
    const storedUser = await userService.getByEmail(email);

    if (!storedUser) {
      throw ApiError.unauthorized("Bad Credentials: Invalid email");
    }

    const hashedPassword = storedUser.password;
    const areEqualPasswords = await bcrypt.compare(password, hashedPassword);

    if (!areEqualPasswords) {
      throw ApiError.unauthorized("Bad Credentials: Invalid password");
    }

    const accessToken = await jwt.generateAccessToken(email);
    const refreshToken = await jwt.generateRefreshToken(email);
    return { user: storedUser, accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    throw ApiError.from(error);
  }
};
