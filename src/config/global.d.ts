import IUser from "../interfaces/user-interface";

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: IUser;
      [key: string]: string;
    }
  }
}
