import Role from "../utils/role";

export const check = (role: string, allowedRoles: string[] = Role.ALL): boolean => {
  const exists: boolean = allowedRoles.includes(role);
  return exists;
};
