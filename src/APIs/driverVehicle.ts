import axios from "axios";
import { IVehicle } from "../Interfaces";

const baseURL = process.env.REACT_APP_API_URL;

export namespace GET {

  export const getUrl = (driverId: string) => `${baseURL}/vehicles/driver/${driverId}/`;

  export type IResponse = IVehicle[];

  export const service = (driverId: string) => {
    return axios.get<IResponse>(getUrl(driverId), {
      headers: {
        "Content-Type": 'application/json'
      }
    });
  };
}

export namespace Delete {

  export const getUrl = (vehicleId: string) => `${baseURL}/vehicles/${vehicleId}/`;

  export const service = (vehicleId: string) => {
    return axios.delete(getUrl(vehicleId));
  };
}

export namespace POST {

  export const getUrl = () => `${baseURL}/vehicles/`;

  export type IRequest = Omit<IVehicle, 'id'>

  export const service = (body: IRequest) => {
    return axios.post<IVehicle>(getUrl(), body);
  };
}