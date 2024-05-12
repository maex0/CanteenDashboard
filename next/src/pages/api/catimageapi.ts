// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextResponse } from "next/server";
import axios from "axios";
import CatImage from "../../types/catImage";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://api.thecatapi.com/v1/";

/**
 * `GET` is an asynchronous function that fetches a random Cat image from TheCatAPI.
 * @returns A Promise that resolves to a NextResponse object containing the fetched data if the request is successful, or an object with an error message if the request fails.
 * @throws Throws an error if the request fails.
 */
export default async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: NextApiRequest,
  res: NextApiResponse<CatImage>,
) {
  try {
    const response = await axios.get(`${API_URL}images/search`);

    const catImage: CatImage = response.data[0];
    console.log(catImage);
    res.status(200).send(catImage);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data
        : "Failed to fetch data";
      res.status(500).json({ error: message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
