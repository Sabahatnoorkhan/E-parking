import axios from "axios";
import { IVehicle } from "../Interfaces";

const baseURL = 'http://127.0.0.1:8000';

export namespace GET {

  export const getUrl = (driverId: string) => `${baseURL}/vehicles/driver/${driverId}`;

  export type IResponse = IVehicle[];

  export const service = (driverId: string) => {
    return axios.get<IResponse>(getUrl(driverId));
  };
}

export namespace Delete {

  export const getUrl = (vehicleId: string) => `${baseURL}/vehicles/${vehicleId}`;

  export const service = (vehicleId: string) => {
    return axios.delete(getUrl(vehicleId));
  };
}