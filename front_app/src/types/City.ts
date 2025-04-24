export interface City {
  country: string;
  country_name: string;
  name: string;
  altnames: string[];
  lat: number;
  lng: number;
}

export interface ApiResponse {
  count: number;
  data: City[];
}
