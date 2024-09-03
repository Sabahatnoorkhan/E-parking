import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export namespace POST {
  export const getUrl = () => `${baseURL}/bookings/`;

  export type IRequest = {
    user: string;
    vehicle: string;
    parking_space: string;
    start_time: number;
    end_time: number;
  };

  export const service = (body: IRequest) => {
    return axios.post(getUrl(), body);
  };
}
