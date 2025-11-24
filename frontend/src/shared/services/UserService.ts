 import {instance} from "./axiosClient";
 import type {IUserData} from "../types/IUserData";


 /*
 =========================================================================
 ************ This is for returning an User object to frontend ***********
 ************   Also if implemented, it's for employees tab    ***********
 ************ This is also what is returned from the backend   ***********
 =========================================================================
 */

 const getAll = () =>
 instance.get<IUserData[]>("/users");

 const get = (id: number) =>
 instance.get<IUserData>(`/users/${id}`);

 const create = (user: IUserData) =>
 instance.post<IUserData>("/users", user);

 const update = (id: number, user: IUserData) =>
 instance.put<IUserData>(`/users/${id}`, user);

 const remove = (id: number) =>
 instance.delete(`/users/${id}`);

 export const UserService = {
 getAll,
 get,
 create,
 update,
 remove,
 };
