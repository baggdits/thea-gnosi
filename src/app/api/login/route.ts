import { NextRequest, NextResponse } from "next/server";


const WORDPRESS_URL = process.env.WORDPRESS_URL;

export async function POST(request: NextRequest) {
  try {
    if (!WORDPRESS_URL) {
      return NextResponse.json(
        {
          message: "WORDPRESS_URL is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const username = body.username;
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Username and password are required.",
        },
        { status: 400 }
      );
    }

    const wordpressResponse = await fetch(
      `${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        cache: "no-store",
      }
    );

    const responseText = await wordpressResponse.text();

    console.log("WORDPRESS LOGIN STATUS:", wordpressResponse.status);
    console.log("WORDPRESS LOGIN RESPONSE:", responseText);

    if (!responseText) {
      return NextResponse.json(
        {
          message: "WordPress returned an empty response.",
        },
        { status: 502 }
      );
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          message: "WordPress returned invalid JSON.",
          wordpress_response: responseText.substring(0, 500),
        },
        { status: 502 }
      );
    }

    if (!wordpressResponse.ok) {
      return NextResponse.json(
        {
          message:
            data.message ||
            data.code ||
            "WordPress login failed.",
        },
        {
          status: wordpressResponse.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Login failed.",
      },
      { status: 500 }
    );
  }
}