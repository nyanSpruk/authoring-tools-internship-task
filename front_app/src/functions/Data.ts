import { type City, type ApiResponse } from "../types/City";

export const fetchCities = async (): Promise<City[]> => {
  try {
    const response = await fetch("http://localhost:3210/api/random");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData: ApiResponse = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
