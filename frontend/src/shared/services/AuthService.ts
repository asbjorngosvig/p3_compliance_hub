import type {ILoginData,IRegisterData, IAuthResponse} from "../types/ILoginData.ts";
import {instance} from "./axiosClient";

const login = async (data: ILoginData) => {
    const res = await instance.post<IAuthResponse>("/users/login", data);
    return res.data;
};

const register = async (data: IRegisterData) => {
    const res = await instance.post<IAuthResponse>("/users/register", data);

    return res.data;
};

const logout = async () => {
    const res = await instance.post<IAuthResponse>("/users/logout");

    return res.data;
};


const isAuthenticated = () => {

};

export const authService = {
    login,
    register,
    logout,
    isAuthenticated,
};
