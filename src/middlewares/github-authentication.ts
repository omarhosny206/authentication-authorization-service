import { Request, Response } from "express";

import ApiError from "../utils/api-error";
import * as jwt from "../utils/jwt";
import StatusCode from "../utils/status-code";

export const handleAuthenticatedUser = async (req: any, res: any): Promise<any> => {
  try {
   


  } catch (error) {
    throw ApiError.unauthorized(`Unauthorized (google): ${error.message}`);
  }
};
