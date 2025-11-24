import type {ILoginData,IRegisterData, IAuthResponse} from "../types/ILoginData.ts";
import {instance} from "./axiosClient";

const login = async (data: ILoginData) => {
    const res = await instance.post<IAuthResponse>("/users/login", data);


    localStorage.setItem("token", res.data.token); //save token

    return res.data; //contains token
};

const register = async (data: IRegisterData) => {
    const res = await instance.post<IAuthResponse>("/users/register", data);

    return res.data;
};

const logout = () => {
    localStorage.removeItem("token");
};

const isAuthenticated = () => {
    return Boolean(localStorage.getItem("token"));
};

export const authService = {
    login,
    register,
    logout,
    isAuthenticated,
};
