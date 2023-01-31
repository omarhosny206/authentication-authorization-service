import { Request, Response } from "express";

import * as jwt from "../utils/jwt";
import StatusCode from "../utils/status-code";

export async function handleAuthenticatedUser(req: any, res: any): Promise<any> {
  const isNewUser = !req.user._id;

  if (isNewUser) {
    return res.status(StatusCode.OK).json({ user: req.user });
  }

  const accessToken: string = await jwt.generateAccessToken(req.user.email);
  const refreshToken: string = await jwt.generateRefreshToken(req.user.email);
  return res.status(StatusCode.OK).json({ user: req.user, accessToken: accessToken, refreshToken: refreshToken });
}
