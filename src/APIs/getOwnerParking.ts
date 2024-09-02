import axios from "axios";
import { IParkingInfo } from "../Interfaces";

export namespace GET {
  const baseURL = 'http://127.0.0.1:8000';

  export const getUrl = (ownerId: string) => `${baseURL}/parking_spaces/owner/${ownerId}/`;

  export type IResponse = IParkingInfo[];

  export const service = (ownerId: string) => {
    return axios.get<IResponse>(getUrl(ownerId));
  };
}