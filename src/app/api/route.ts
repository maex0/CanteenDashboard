import { NextResponse } from "next/server";

/**
 * `GET` is an asynchronous function that fetches data from TheCatAPI.
 * It specifically fetches a list of 10 random cat images.
 * @returns A Promise that resolves to a NextResponse object containing the fetched data if the request is successful, or an object with an error message if the request fails.
 * @throws Throws an error if the fetch request fails.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10",
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
