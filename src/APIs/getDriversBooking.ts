import axios from "axios";
import { IDriverBooking } from "../Interfaces";

export namespace GET {
  const baseURL = process.env.REACT_APP_API_URL;

  export const getUrl = (driverId: string) => `${baseURL}/bookings/driver/${driverId}/`;

  export type IResponse = IDriverBooking[];

  export const service = (driverId: string) => {
    return axios.get<IResponse>(getUrl(driverId));
  };
}