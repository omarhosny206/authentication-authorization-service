export default class Role {
  static readonly USER: string = "user";
  static readonly ADMIN: string = "admin";
  static readonly ALL: string[] = [this.USER, this.ADMIN];
}
