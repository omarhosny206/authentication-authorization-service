import { NextFunction, Request, RequestHandler, Response } from "express";
import { ObjectId, Types } from "mongoose";

import IUser from "../interfaces/user-interface";
import * as userService from "../services/user-service";

export const getAll: RequestHandler = async (req: Request, res: Response<IUser[]>, next: NextFunction): Promise<Response<IUser[]> | void> => {
  try {
    const users: IUser[] = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const getById: RequestHandler = async (
  req: Request,
  res: Response<IUser | null>,
  next: NextFunction
): Promise<Response<IUser | null> | void> => {
  try {
    const _id: Types.ObjectId = new Types.ObjectId(req.params._id);
    const user: IUser | null = await userService.getById(_id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
