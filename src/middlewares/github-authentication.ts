import axios from "axios";
import * as dotenv from "dotenv";

import IUser from "../interfaces/user-interface";
import * as userService from "../services/user-service";
import ApiError from "../utils/api-error";
import * as jwt from "../utils/jwt";
import StatusCode from "../utils/status-code";

dotenv.config();

const GITHUB_OAUTH2_URL: string | undefined = process.env.GITHUB_OAUTH2_URL;
const GITHUB_OAUTH2_URL_EMAILS: string | undefined = process.env.GITHUB_OAUTH2_URL_EMAILS;
const GITHUB_CLIENT_ID: string | undefined = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET: string | undefined = process.env.GITHUB_CLIENT_SECRET;

export const authenticateByAccessToken = async (req: any, res: any, next: any): Promise<any> => {
  try {
    const { githubAccessToken } = req.body;

    if (!githubAccessToken) {
      throw ApiError.unauthorized("Unauthorized (github): github access token not provided");
    }

    const { data } = await axios.get(GITHUB_OAUTH2_URL!, { headers: { Authorization: `Bearer ${githubAccessToken}` } });

    let [firstName, ...lastName] = data.name.split(" ");
    lastName = lastName.join(" ");
    const email: string = data.login;

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
