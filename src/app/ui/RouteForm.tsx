"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Field from "./Field";

const RouteForm = () => {
  const searchParams = useSearchParams();

  const [distance, setDistance] = useState(
    Number(searchParams.get("distance")?.toString()) || 1
  );
  const [origin, setOrigin] = useState(
    searchParams.get("origin")?.toString() || "43.76795,-87.70698"
  );
  const pathname = usePathname();
  const { replace } = useRouter();

  const generateMap = () => {
    const params = new URLSearchParams(searchParams);
    params.set("origin", origin);
    params.set("distance", distance.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <form className="max-w-sm w-full mx-auto flex flex-col">
      <Field
        label="Origin"
        id="origin"
        value={origin}
        onChange={(e) => setOrigin(e.currentTarget.value)}
      />
      <Field
        label="Distance"
        id="distance"
        type="number"
        min={1}
        value={distance}
        onChange={(e) => setDistance(e.currentTarget.valueAsNumber)}
      />
      <button
        type="button"
        onClick={() => generateMap()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Generate Route
      </button>
    </form>
  );
};

export default RouteForm;
