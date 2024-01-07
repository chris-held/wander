"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  useLoadScript,
  GoogleMap,
  Polyline,
  Marker,
} from "@react-google-maps/api";

export default function Map({
  route,
}: {
  route: { lat: number; lng: number }[];
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: [],
  });

  if (!isLoaded) {
    return null;
  }

  const origin = route[0];
  const destination = route.at(-1);

  return (
    <div className="mt-2 p-4 w-full">
      <p className="text-lg text-center mb-2">
        If you want a new map with the same parameters, refresh.
      </p>
      <GoogleMap
        options={{
          clickableIcons: true,
        }}
        zoom={14}
        center={route[0]}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      >
        <Marker position={origin} />
        {destination && <Marker position={destination} />}
        <Polyline path={route} />
      </GoogleMap>
      <p>Route JSON:</p>
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(route, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
}
