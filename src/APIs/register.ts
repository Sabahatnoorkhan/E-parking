import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export namespace POST {

  export const getUrl = () => `${baseURL}/users/`;  

  export interface IRequest {
    username: string;
    email: string;
    role: string;
    password: string;
    licenseNumber: string;
  }

  export type IResponse = IRequest & {
    id: string;
  };

  export const service = (body: IRequest) => {
    return axios.post<IResponse>(getUrl(), body);
  };
}

export namespace Delete {

  export const getUrl = (userId: string) => `${baseURL}/users/${userId}`;

  export const service = (userId: string) => {
    return axios.delete(getUrl(userId));
  };
}

export namespace PUT {

  export const getUrl = (userId: string) => `${baseURL}/users/${userId}`;

  export interface IResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    password: string;
    licenseNumber: string;
  }

  export const service = (userId: string) => {
    return axios.put<IResponse>(getUrl(userId));
  };
}
