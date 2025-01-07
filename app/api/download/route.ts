import { NextRequest, NextResponse } from "next/server";
import Tiktok from "@tobyg74/tiktok-api-dl";
import rateLimit from "next-rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 100,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url || "";

    if (!url) {
      return NextResponse.json(
        {
          developer: "Mahmoud Sayed",
          error: "Bad Request",
          message: "URL is required.",
        },
        { status: 400 }
      );
    }

    await limiter.checkNext(req, 100);

    const data = await Tiktok.Downloader(url, {
      version: "v1",
      proxy: "https://204.236.137.68:80",
    });
    const dataV2 = await Tiktok.Downloader(url, {
      version: "v3",
    });
    return NextResponse.json({ data, dataV2 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        developer: "Mahmoud Sayed",
        error: "Internal Server Error",
        message: error?.message || "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
