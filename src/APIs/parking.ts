import axios from "axios";
import { IParkingInfo } from "../Interfaces";

const baseURL = 'http://127.0.0.1:8000';

export namespace GET {

  export const getUrl = () => `${baseURL}/parking_spaces/`;

  export type IResponse = IParkingInfo[];

  export const service = () => {
    return axios.get<IResponse>(getUrl());
  };
}

export namespace POST {

  export const getUrl = () => `${baseURL}/parking_spaces/`;

  export interface IRequest {
    owner: string;
    name: string;
    location: string;
    total_slots: number;
    available_slots: number;
    price: number;
  }

  export type IResponse = IParkingInfo;

  export const service = (body: IRequest) => {
    return axios.post<IResponse>(getUrl(), body);
  };
}

export namespace PUT {
  
    export const getUrl = () => `${baseURL}/parking_spaces/`;
  
    export interface IRequest {
      owner: string;
      name: string;
      location: string;
      total_slots: number;
      available_slots: number;
      price: number;
    }
  
    export type IResponse = IParkingInfo;
  
    export const service = (body: IRequest) => {
      return axios.put<IResponse>(getUrl(), body);
    };
}

export namespace Delete {
    const baseURL = process.env.REACT_APP_API_URL;
  
    export const getUrl = (id: string) => `${baseURL}/parking_spaces/${id}`;
  
    export const service = (id: string) => {
      return axios.delete(getUrl(id));
    };
}