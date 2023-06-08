import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";


// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
      errorinfo: null;
      // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}