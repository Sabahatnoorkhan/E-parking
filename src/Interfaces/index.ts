export interface ILocationInfo {
    id: string;
    name: string;
    address: string;
    noOfSlotsAvailable: number;
    pricePerHour: number
    latitude: number;
    longitude: number;
}

export interface IBookingHistory {
    locationId: string
    locationName: string;
    address: string;
    slotNumber: number;
    bookedFrom: EpochTimeStamp;
    totalHourOfBooking: number;
    latitude: number;
    longitude: number;
}

export interface IOwnerLocationInfo {
    id: string;
    name: string;
    address: string;
    noOfSlots: number;
    pricePerHour: number
    latitude: number;
    longitude: number;
}

export type PageState = 'Initial' | 'Loading' | 'Error' | 'Data'

export type LocationModalState = 'Add' | 'Edit'