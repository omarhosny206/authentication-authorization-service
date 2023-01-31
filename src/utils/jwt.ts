import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

import ApiError from "./api-error";

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY: string | undefined = process.env.ACCESS_TOKEN_SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION: string | undefined = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_SECRET_KEY: string | undefined = process.env.REFRESH_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_EXPIRATION: string | undefined = process.env.REFRESH_TOKEN_EXPIRATION;

export const generateAccessToken = async (email: string): Promise<string> => {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: ACCESS_TOKEN_EXPIRATION };
    const token = await jwt.sign({ email: email }, ACCESS_TOKEN_SECRET_KEY!, signOptions);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};

export const generateRefreshToken = async (email: string): Promise<string> => {
  try {
    const signOptions: jwt.SignOptions = { expiresIn: REFRESH_TOKEN_EXPIRATION };
    const token = await jwt.sign({email: email}, REFRESH_TOKEN_SECRET_KEY!, signOptions);
    return token;
  } catch (error) {
    throw ApiError.from(error);
  }
};

export const verifyAccessToken = async (token: string): Promise<jwt.JwtPayload> => {
  try {
    const payload: jwt.JwtPayload = (await jwt.verify(token, ACCESS_TOKEN_SECRET_KEY!)) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
};

export const verifyRefreshToken = async (token: string): Promise<jwt.JwtPayload> => {
  try {
    const payload: jwt.JwtPayload = (await jwt.verify(token, REFRESH_TOKEN_SECRET_KEY!)) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
};
