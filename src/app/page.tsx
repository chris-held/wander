import RouteForm from "./ui/RouteForm";
import { getRoute } from "./lib/map";
import Map from "./ui/Map";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    origin?: string;
    distance?: string;
  };
}) {
  let route;
  if (searchParams?.origin && searchParams?.distance) {
    const [lat, lng] = searchParams.origin.split(",");
    const origin = { lat: Number(lat), lng: Number(lng) };
    const distance = Number(searchParams?.distance);
    const result = await getRoute(origin, distance);
    route = result.route;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 w-full">
      <h1 className="text-4xl font-bold text-center mb-4">
        Go Wander Playground
      </h1>
      <p className="text-center max-w-lg mb-4">
        The below route is just a suggestion - it will take approximately
        (distance / 2) miles to get to.
      </p>
      <RouteForm />
      {route && route.length ? <Map route={route} /> : null}
    </main>
  );
}
