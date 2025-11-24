export interface ILoginData {
    email:string;
    password:string;
}
export interface IRegisterData {
    name:string;
    email:string;
    role: "ADMIN" | "EMPLOYEE";
    password:string;
}

export interface IAuthResponse {
    token: string;
}