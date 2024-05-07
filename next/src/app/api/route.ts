import { NextResponse } from "next/server";
import axios, { isAxiosError } from "axios";
import Image from "../../types/image";

const API_URL = "https://api.thecatapi.com/v1/";

/**
 * `GET` is an asynchronous function that fetches a random Cat image from TheCatAPI.
 * @returns A Promise that resolves to a NextResponse object containing the fetched data if the request is successful, or an object with an error message if the request fails.
 * @throws Throws an error if the request fails.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const response = await axios.get(`${API_URL}images/search`);

    const catImage: Image = response.data[0];

    return NextResponse.json(catImage);
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response
        ? error.response.data
        : "Failed to fetch data";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
