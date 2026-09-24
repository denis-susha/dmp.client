import { IUserInfo } from "./userInfo";

export interface IAuthInfo {
    userInfo: IUserInfo;
    expiry: string;
}
