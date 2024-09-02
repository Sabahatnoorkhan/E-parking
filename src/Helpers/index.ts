import { IVehicle } from "../Interfaces";

export const getDropdownOptions = (vehicles: IVehicle[]) => {
return vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.car_model
  }))
}