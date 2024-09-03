import axios from "axios";
import { IParkingInfo } from "../Interfaces";

const baseURL = process.env.REACT_APP_API_URL;

export namespace GET {
  export const getUrl = () => `${baseURL}/parking_spaces/`;

  export const service = () => {
    return axios.get<IParkingInfo[]>(getUrl());
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
    longitude: number;
    latitude: number;
  }

  export type IResponse = IParkingInfo;

  export const service = (body: IRequest) => {
    return axios.post<IResponse>(getUrl(), body);
  };
}

export namespace PUT {
  export const getUrl = (id: string) => `${baseURL}/parking_spaces/${id}/`;

  export interface IRequest {
    owner: string;
    name: string;
    location: string;
    total_slots: number;
    price: number;
    longitude: number;
    latitude: number;
    available_slots?: number;
  }

  export type IResponse = IParkingInfo;

  export const service = (body: IRequest, id: string) => {
    return axios.put<IResponse>(getUrl(id), body);
  };
}

export namespace Delete {

  export const getUrl = (id: string) => `${baseURL}/parking_spaces/${id}/`;

  export const service = (id: string) => {
    return axios.delete(getUrl(id));
  };
}
