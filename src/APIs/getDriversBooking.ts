import axios from "axios";
import { IDriverBooking } from "../Interfaces";

export namespace GET {
  const baseURL = 'http://127.0.0.1:8000';

  export const getUrl = (driverId: string) => `${baseURL}/bookings/driver/${driverId}/`;

  export type IResponse = IDriverBooking[];

  export const service = (driverId: string) => {
    return axios.get<IResponse>(getUrl(driverId));
  };
}