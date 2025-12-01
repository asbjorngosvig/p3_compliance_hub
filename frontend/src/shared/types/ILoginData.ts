export interface ILoginData {
    username:string; // email
    password:string;
}
export interface IRegisterData {
    name:string;
    username:string; // email
    role: "ADMIN" | "EMPLOYEE";
    password:string;
}

export interface IAuthResponse {
    token: string;
}