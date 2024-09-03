import axios from "axios";
import { IUser } from "../Interfaces";

export namespace POST {
  const baseURL = process.env.REACT_APP_API_URL;

  export const getUrl = () => `${baseURL}/user-mgmt/api/token`;

  export interface IRequest {
    username: string;
    password: string;
  }

  export interface IResponse {
    refresh: string;
    access: string;
    user_info: IUser
  }

  export const service = (body: IRequest) => {
    return axios.post<IResponse>(getUrl(), body);
  };
}
