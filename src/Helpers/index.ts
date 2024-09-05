import moment from "moment";
import { IVehicle } from "../Interfaces";

export const getDropdownOptions = (vehicles: IVehicle[]) => {
return vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.car_model
  }))
}

export const getTimeInEpoch = (dateString: string) => {
  const dateObject = new Date(dateString);
return dateObject.getTime();
}

export const getEndTime = (fromTime: number, totalHours: number) => {
  return fromTime + (3600000*totalHours)
}

export const getFormattedDate = ( epoch: number) => {
  return moment(epoch).format('MM/DD/YYYY hh:mm A')
}