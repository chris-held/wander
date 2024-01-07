type LatLng = {
  lat: number;
  lng: number;
};

type RouteResponse = {
  totalDistance: number;
  route: { lat: number; lng: number }[];
};

// use the haversine formula to get a random point based on an origin and distance
const getRandomDestination = (origin: LatLng, distance: number): LatLng => {
  const { lat, lng } = origin;
  // 3959 = earth radius in miles
  const earthRadius: number = 3959; // You can use 6371 for kilometers

  // Convert distance from miles to radians
  const distanceRad: number = distance / earthRadius;

  // Generate a random bearing (angle) between 0 and 360 degrees
  const bearing: number = (Math.PI / 180) * Math.random() * 360;

  // Calculate new latitude and longitude
  const latRad: number = (Math.PI / 180) * lat;
  const lngRad: number = (Math.PI / 180) * lng;

  const newLatRad: number = Math.asin(
    Math.sin(latRad) * Math.cos(distanceRad) +
      Math.cos(latRad) * Math.sin(distanceRad) * Math.cos(bearing)
  );

  const newLngRad: number =
    lngRad +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distanceRad) * Math.cos(latRad),
      Math.cos(distanceRad) - Math.sin(latRad) * Math.sin(newLatRad)
    );

  // Convert new latitude and longitude to degrees
  const newLat: number = (180 / Math.PI) * newLatRad;
  const newLng: number = (180 / Math.PI) * newLngRad;

  return { lat: newLat, lng: newLng };
};

const getWalkingDirections = async (
  waypoints: LatLng[]
): Promise<{ lat: number; lng: number }[]> => {
  const [origin, destination] = waypoints;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&avoid=highways&mode=walking&key=${process.env.GOOGLE_MAPS_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Google Maps Error: ${response.status} : ${response.statusText}`
    );
  }
  const json = await response.json();
  // TODO - error handling, type and map google maps response
  // TODO - get the route that is closest to the passed in distance,
  // then return the directions for that route as a series of waypoints that can
  // be plotted on a map. May need to change what gets returned here, maybe just return the whole
  // route object9
  console.log(
    `Route distance: ${JSON.stringify(json.routes[0].legs[0].distance)}`
  );
  const route = json.routes[0].legs.flatMap((leg: any) => [
    { lat: leg.start_location.lat, lng: leg.start_location.lng },
    ...leg.steps.map((step: any) => ({
      lat: step.end_location.lat,
      lng: step.end_location.lng,
    })),
  ]);
  return route;
};

export const getRoute = async (
  origin: LatLng,
  distance: number
): Promise<RouteResponse> => {
  // for now default to an out and back route
  const destination = getRandomDestination(origin, distance / 2);
  const route = await getWalkingDirections([origin, destination]);
  return {
    totalDistance: 0,
    route,
  };
};
