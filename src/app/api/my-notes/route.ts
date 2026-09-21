import { NextRequest, NextResponse } from "next/server";


const WORDPRESS_URL =
  process.env.WORDPRESS_URL;

export async function GET(
  request: NextRequest
) {
  try {
    const authorization =
      request.headers.get(
        "authorization"
      );

    if (!authorization) {
      return NextResponse.json(
        {
          message:
            "Authorization header is required.",
        },
        {
          status: 401,
        }
      );
    }

    if (!WORDPRESS_URL) {
      return NextResponse.json(
        {
          message:
            "WORDPRESS_URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const parts =
      authorization.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer" ||
      !parts[1]
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid authorization header.",
        },
        {
          status: 401,
        }
      );
    }

    const token = parts[1];

    const wordpressResponse =
      await fetch(
        `${WORDPRESS_URL}/wp-json/thea-gnosi/v1/my-notes`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          cache: "no-store",
        }
      );

    const responseText =
      await wordpressResponse.text();

    console.log(
      "WORDPRESS NOTES STATUS:",
      wordpressResponse.status
    );

    console.log(
      "WORDPRESS NOTES RESPONSE:",
      responseText
    );

    if (!responseText) {
      return NextResponse.json(
        {
          message:
            "WordPress returned an empty response.",
        },
        {
          status: 502,
        }
      );
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          message:
            "WordPress returned invalid JSON.",
          wordpress_response:
            responseText.substring(
              0,
              500
            ),
        },
        {
          status: 502,
        }
      );
    }

    if (!wordpressResponse.ok) {
      return NextResponse.json(
        data,
        {
          status:
            wordpressResponse.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "My Notes API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch notes.",
      },
      {
        status: 500,
      }
    );
  }
}