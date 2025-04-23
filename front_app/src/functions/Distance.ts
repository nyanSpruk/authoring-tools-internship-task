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

export const haversineDistanceAI = () => {
  return "AItomato";
};
