import { NextResponse } from "next/server";
import * as z from "zod/v3";

export const runtime = "edge";

const emailSchema = z.string().email();

export async function POST(req: Request) {
  const body = await req.json();
  const { email, source } = body;

  if (!emailSchema.safeParse(email).success) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const loopsResponse = await fetch(
      "https://app.loops.so/api/v1/contacts/create",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          source,
          mailingLists: {
            cmbzj9z64074z0iyj7jj38ra6: true,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        },
      }
    );

    if (loopsResponse.status === 200 || loopsResponse.status === 409) {
      return NextResponse.json({ status: "OK" });
    } else {
      console.error("Loops", JSON.stringify(loopsResponse));
      return NextResponse.json(
        {},
        { status: 500, statusText: "Internal Server Error" }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText:
          error instanceof Error ? error.message : "Internal Server Error",
      }
    );
  }
}
