// Formula from https://en.wikipedia.org/wiki/Haversine_formula
// Lat & Lng need to be in radians  *pi/180
// r is radius of earth (6371km)
// d = r archav(hav(fi)) = 2 r arcsin(sqrt(hav(fi)))
// hav(fi) =hav(lat2-lat1) + cos(lat1)cos(lat2)hav(lng2-lng1)
//d = 2r arcsin(sqrt((1-cos(lat2-lat1) + cos(lat1)*cos(lat2) * (1-cos(lng2-lng1)))/2))
// Returns distance in km
export const haversineDistanceMine = (
  latUser: number,
  lngUser: number,
  latCity: number,
  lngCity: number
) => {
  latCity = (latCity * Math.PI) / 180;
  lngCity = (lngCity * Math.PI) / 180;
  latUser = (latUser * Math.PI) / 180;
  lngUser = (lngUser * Math.PI) / 180;
  const R = 6371000;
  const p1 = 1 - Math.cos(latCity - latUser);
  const p2 =
    Math.cos(latUser) * Math.cos(latCity) * (1 - Math.cos(lngCity - lngUser));
  const d = 2 * R * Math.asin(Math.sqrt((p1 + p2) / 2));
  return Math.round(d) / 1000;
};

/**
 * Calculates the distance between two geographic points using the Haversine formula.
 * @param lat1 Latitude of point A in decimal degrees.
 * @param lon1 Longitude of point A in decimal degrees.
 * @param lat2 Latitude of point B in decimal degrees.
 * @param lon2 Longitude of point B in decimal degrees.
 * @returns Distance between the two points in kilometers, rounded to 2 decimal places.
 */
export function haversineDistanceAI(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  // Round to 2 decimal places and return as a number
  return parseFloat(distance.toFixed(3));
}
