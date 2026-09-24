import { UserRoleEnum } from "../userRoleEnum";

export interface IUserInfo {
    isClient: boolean;
    role: UserRoleEnum;
    name: string;
}
