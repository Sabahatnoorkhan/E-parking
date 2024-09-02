import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

export namespace POST {
  export const getUrl = () => `${baseURL}/bookings/`;

  export type IRequest = {
    user: string;
    vehicle: string;
    parking_space: string;
    start_time: string;
    end_time: string;
  };

  export const service = (body: IRequest) => {
    return axios.post(getUrl(), body);
  };
}
