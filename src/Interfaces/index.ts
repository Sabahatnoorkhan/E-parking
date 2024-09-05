export interface IBookingHistory {
  locationId: string;
  locationName: string;
  address: string;
  slotNumber: number;
  bookedFrom: EpochTimeStamp;
  totalHourOfBooking: number;
  latitude: number;
  longitude: number;
}

export interface IParkingInfo {
  id: string;
  name: string;
  location: string;
  total_slots: number;
  available_slots: number;
  price: number;
  longitude: number;
  latitude: number;
  owner: string;
}

export interface IDriverBooking {
  id: string;
  booking_time: string;
  start_time: number;
  end_time: number;
  user: string;
  vehicle: string;
  parking_space: string,
  vehicle_object: IVehicle,
  parking_space_object: IParkingInfo,
}

export interface IVehicle {
  id: string;
  plate_number: string;
  car_model: string;
  user: string;
}

export interface IUser {
  user_id: string;
  username: string;
  email: string;
  role: UserRole;
}

export type PageState = "Initial" | "Loading" | "Error" | "Data";

export type LocationModalState = "Add" | "Edit";

export type UserRole = "driver" | "parking_owner";
