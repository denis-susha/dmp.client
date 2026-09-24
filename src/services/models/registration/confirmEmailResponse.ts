import { IAuthInfo } from "./authInfo";
import { ConfirmEmailStatusEnum } from "./confirmEmailStatusEnum";

export interface IConfirmEmailResponse {
    status: ConfirmEmailStatusEnum;
    authInfo: IAuthInfo;
}
