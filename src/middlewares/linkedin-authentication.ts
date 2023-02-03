import axios from "axios";
import * as dotenv from "dotenv";

import IUser from "../interfaces/user-interface";
import * as userService from "../services/user-service";
import ApiError from "../utils/api-error";
import * as jwt from "../utils/jwt";
import StatusCode from "../utils/status-code";

dotenv.config();

const LINKEDIN_OAUTH2_URL: string | undefined = process.env.LINKEDIN_OAUTH2_URL;
const LINKEDIN_OAUTH2_EMAIL_URL: string | undefined = process.env.LINKEDIN_OAUTH2_EMAIL_URL;

export const authenticateByAccessToken = async (req: any, res: any, next: any): Promise<any> => {
  try {
    const { linkedinAccessToken } = req.body;

    if (!linkedinAccessToken) {
      throw ApiError.unauthorized("Unauthorized (linkedin): linkedin access token not provided");
    }

    const nameInfoPromise = axios.get(LINKEDIN_OAUTH2_URL!, { headers: { Authorization: `Bearer ${linkedinAccessToken}` } });
    const emailInfoPromise = axios.get(LINKEDIN_OAUTH2_EMAIL_URL!, { headers: { Authorization: `Bearer ${linkedinAccessToken}` } });

    const [{ data: nameInfo }, { data: emailInfo }] = await Promise.all([nameInfoPromise, emailInfoPromise]);

    const firstName = nameInfo.localizedFirstName;
    const lastName = nameInfo.localizedLastName;
    const email = emailInfo.elements.find((element: any) => element.primary === true)["handle~"].emailAddress;

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
