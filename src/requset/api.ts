import server from ".";
import { IResponse } from "../types/Login";
interface ILoginData {
    username: string;
    password: string
}
export async  function login (data: ILoginData) {
     return await server.post<unknown, IResponse>('/login', data)
}