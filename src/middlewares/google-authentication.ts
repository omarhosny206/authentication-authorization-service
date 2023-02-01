import axios from "axios";
import * as dotenv from "dotenv";

import IUser from "../interfaces/user-interface";
import * as userService from "../services/user-service";
import ApiError from "../utils/api-error";
import * as jwt from "../utils/jwt";
import StatusCode from "../utils/status-code";

dotenv.config();

const GOOGLE_OAUTH2_URL: string | undefined = process.env.GOOGLE_OAUTH2_URL;

export const authenticateByAccessToken = async (req: any, res: any, next: any): Promise<any> => {
  try {
    const { googleAccessToken } = req.body;

    if (!googleAccessToken) {
      throw ApiError.unauthorized("Unauthorized (google): google access token not provided");
    }

    const { data } = await axios.get(GOOGLE_OAUTH2_URL!, { headers: { Authorization: `Bearer ${googleAccessToken}` } });
    const firstName: string = data.given_name;
    const lastName: string = data.family_name;
    const email: string = data.email;

    const user: IUser | null = await userService.getByEmail(email);

    if (!user) {
      return res.status(StatusCode.OK).json({ firstName: firstName, lastName: lastName, email: email });
    }

    const accessToken: string = await jwt.generateAccessToken(user.email);
    const refreshToken: string = await jwt.generateRefreshToken(user.email);
    return res.status(StatusCode.OK).json({ user: user, accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    return next(error);
  }
};
