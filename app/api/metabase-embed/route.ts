import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const METABASE_SITE_URL = "https://langfuse.metabaseapp.com";
    const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

    if (!METABASE_SECRET_KEY) {
      console.error(
        "Missing required environment variables: METABASE_SECRET_KEY"
      );
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const dashboardId = searchParams.get("dashboardId")
      ? parseInt(searchParams.get("dashboardId")!, 10)
      : 25;
    const theme =
      searchParams.get("theme") === "day" ? "day" : "night";

    const payload = {
      resource: { dashboard: dashboardId },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60,
    };

    const token = jwt.sign(payload, METABASE_SECRET_KEY);

    const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#theme=${theme}&bordered=false&titled=false`;

    return NextResponse.json(
      {
        iframeUrl,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error generating Metabase embed URL:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
