import { getRoute } from "@/app/lib/map";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // TODO - pull origin and distance from params
  const route = await getRoute({ lat: 43.76795, lng: -87.70698 }, 3);
  return NextResponse.json(route, { status: 200 });
}
