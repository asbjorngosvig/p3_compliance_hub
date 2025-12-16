import api from "../api/api";
 import type {IUserData} from "../types/IUserData";


 /*
 =========================================================================
 ************ This is for returning an User object to frontend ***********
 ************   Also if implemented, it's for employees tab    ***********
 ************ This is also what is returned from the backend   ***********
 =========================================================================
 */

 const getAll = () =>
 api.get<IUserData[]>("api/users");

 const get = (id: number) =>
 api.get<IUserData>(`api/users/${id}`);

 const create = (user: IUserData) =>
 api.post<IUserData>("api/users", user);

 const update = (id: number, user: IUserData) =>
 api.put<IUserData>(`api/users/${id}`, user);

 const remove = (id: number) =>
 api.delete(`api/users/${id}`);

 export const UserService = {
 getAll,
 get,
 create,
 update,
 remove,
 };
