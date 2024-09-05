import moment from "moment";
import { getDropdownOptions, getEndTime, getFormattedDate, getTimeInEpoch } from ".";
import { IVehicle } from "../Interfaces";

describe("getDropdownOptions", () => {
  it("should map vehicles to dropdown options correctly", () => {
    const vehicles: IVehicle[] = [
      {
        id: "1",
        plate_number: "ABC123",
        car_model: "Toyota Corolla",
        user: "user1",
      },
      {
        id: "2",
        plate_number: "XYZ789",
        car_model: "Honda Civic",
        user: "user2",
      },
    ];

    const expectedOptions = [
      { value: "1", label: "Toyota Corolla" },
      { value: "2", label: "Honda Civic" },
    ];

    expect(getDropdownOptions(vehicles)).toEqual(expectedOptions);
  });
});

describe("getTimeInEpoch", () => {
  it("should convert date string to epoch time", () => {
    const dateString = "2024-09-06T00:00:00Z";
    const dateObject = new Date(dateString);
    const expectedEpochTime = dateObject.getTime();

    expect(getTimeInEpoch(dateString)).toBe(expectedEpochTime);
  });
});

describe("getEndTime", () => {
  it("should calculate the end time given the start time and total hours", () => {
    const fromTime = 1693996800000;
    const totalHours = 2;
    const expectedEndTime = fromTime + 3600000 * totalHours;

    expect(getEndTime(fromTime, totalHours)).toBe(expectedEndTime);
  });
});

describe('getFormattedDate', () => {
    it('should format the epoch time correctly', () => {
      const epochTime = 1672531200000; // Example epoch time (Jan 1, 2023 12:00:00 AM)
      const formattedTime = getFormattedDate(epochTime);
  
      // Expected format: MM/DD/YYYY hh:mm A
      const expectedTime = moment(epochTime).format('MM/DD/YYYY hh:mm A');
      
      expect(formattedTime).toBe(expectedTime);
    });
  });