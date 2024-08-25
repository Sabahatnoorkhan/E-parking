import { IBookingHistory, ILocationInfo, IOwnerLocationInfo } from "../../../Interfaces";

export const mockLocationData: ILocationInfo[] = [
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlotsAvailable: 15,
    latitude: 40.7128,
    longitude: -74.0060,
    pricePerHour: 10
  },
  {
    id: "2",
    name: "West Side Parking",
    address:
      "896 main st,Cityville ,uppar kot ,bulandshahr, up , indian, mock address to show truncated address and tooltip",
    noOfSlotsAvailable: 5,
    latitude: 34.0522,
    longitude: -118.2437,
    pricePerHour: 10
  },
  {
    id: "3",
    name: "East End Parking",
    address: "789 Oak St, Villagetown",
    noOfSlotsAvailable: 20,
    latitude: 51.5074,
    longitude: -0.1278,
    pricePerHour: 10
  },
  {
    id: "2",
    name: "West Side Parking",
    address:
      "896 main st,Cityville ,uppar kot ,bulandshahr, up , indian, mock address to show truncated address and tooltip",
    noOfSlotsAvailable: 5,
    latitude: 34.0522,
    longitude: -118.2437,
    pricePerHour: 10
  },
  {
    id: "3",
    name: "East End Parking",
    address: "789 Oak St, Villagetown",
    noOfSlotsAvailable: 20,
    latitude: 51.5074,
    longitude: -0.1278,
    pricePerHour: 10
  },
  {
    id: "4",
    name: "North Parking",
    address: "101 Pine St, Metropolis",
    noOfSlotsAvailable: 0,
    latitude: 35.6895,
    longitude: 139.6917,
    pricePerHour: 10
  },
  {
    id: "5",
    name: "South Parking",
    address: "202 Cedar St, Hamlet",
    noOfSlotsAvailable: 10,
    latitude: 48.8566,
    longitude: 2.3522,
    pricePerHour: 10
  },
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlotsAvailable: 15,
    latitude: 40.7128,
    longitude: -74.0060,
    pricePerHour: 10
  },
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlotsAvailable: 15,
    latitude: 40.7128,
    longitude: -74.0060,
    pricePerHour: 10
  },
];

export const mockBookingHistory: IBookingHistory[] = [
  {
    locationId: 'loc123',
    locationName: 'Downtown Parking',
    address: '123 Main St, Cityville',
    slotNumber: 45,
    bookedFrom: 1672531200000, // Example Epoch time (Jan 1, 2023)
    totalHourOfBooking: 2,
    latitude: 40.712776,
    longitude: -74.005974,
  },
  {
    locationId: 'loc456',
    locationName: 'Uptown Garage',
    address: '456 Elm St, Cityville',
    slotNumber: 12,
    bookedFrom: 1672617600000, // Example Epoch time (Jan 2, 2023)
    totalHourOfBooking: 4,
    latitude: 40.73061,
    longitude: -73.935242,
  },
  {
    locationId: 'loc789',
    locationName: 'Suburban Lot',
    address: '789 Maple Rd, Suburbia',
    slotNumber: 27,
    bookedFrom: 1672704000000, // Example Epoch time (Jan 3, 2023)
    totalHourOfBooking: 1,
    latitude: 40.6971494,
    longitude: -74.2598655,
  },
  {
    locationId: 'loc123',
    locationName: 'Downtown Parking',
    address: '123 Main St, Cityville',
    slotNumber: 45,
    bookedFrom: 1672531200000, // Example Epoch time (Jan 1, 2023)
    totalHourOfBooking: 2,
    latitude: 40.712776,
    longitude: -74.005974,
  },
  {
    locationId: 'loc456',
    locationName: 'Uptown Garage',
    address: '456 Elm St, Cityville',
    slotNumber: 12,
    bookedFrom: 1672617600000, // Example Epoch time (Jan 2, 2023)
    totalHourOfBooking: 4,
    latitude: 40.73061,
    longitude: -73.935242,
  },
  {
    locationId: 'loc789',
    locationName: 'Suburban Lot',
    address: '789 Maple Rd, Suburbia',
    slotNumber: 27,
    bookedFrom: 1672704000000, // Example Epoch time (Jan 3, 2023)
    totalHourOfBooking: 1,
    latitude: 40.6971494,
    longitude: -74.2598655,
  },
  {
    locationId: 'loc123',
    locationName: 'Downtown Parking',
    address: '123 Main St, Cityville',
    slotNumber: 45,
    bookedFrom: 1672531200000, // Example Epoch time (Jan 1, 2023)
    totalHourOfBooking: 2,
    latitude: 40.712776,
    longitude: -74.005974,
  },
];

export const mockOwnerLocation: IOwnerLocationInfo[] = [
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlots: 15,
    latitude: 40.7128,
    longitude:-74.0060,
    pricePerHour: 10
  },
  {
    id: "2",
    name: "West Side Parking",
    address:
      "896 main st,Cityville ,uppar kot ,bulandshahr, up , indian, mock address to show truncated address and tooltip",
      noOfSlots: 5,
    latitude: 34.0522,
    longitude: -118.2437,
    pricePerHour: 10
  },
  {
    id: "3",
    name: "East End Parking",
    address: "789 Oak St, Villagetown",
    noOfSlots: 20,
    latitude: 51.5074,
    longitude: -0.1278,
    pricePerHour: 10
  },
  {
    id: "4",
    name: "North Parking",
    address: "101 Pine St, Metropolis",
    noOfSlots: 0,
    latitude: 35.6895,
    longitude: 139.6917,
    pricePerHour: 10
  },
  {
    id: "5",
    name: "South Parking",
    address: "202 Cedar St, Hamlet",
    noOfSlots: 10,
    latitude: 48.8566,
    longitude: 2.3522,
    pricePerHour: 10
  },
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlots: 15,
    latitude: 40.7128,
    longitude: -74.0060,
    pricePerHour: 10
  },
  {
    id: "1",
    name: "Central Parking",
    address: "123 Main St, Cityville",
    noOfSlots: 15,
    latitude: 40.7128,
    longitude: -74.0060,
    pricePerHour: 10
  },
];