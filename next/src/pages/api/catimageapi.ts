import axios from "axios";
import CatImage from "../../types/catImage";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * `GET` is an asynchronous function that fetches a random Cat image from TheCatAPI.
 * @param _req - The incoming request object from Next.js
 * @param res - The response object from Next.js
 * @returns A Promise that resolves to a NextResponse object containing the fetched data if the request is successful, or an object with an error message if the request fails.
 * @throws Throws an error if the request fails.
 */
export default async function GET(
  _req: NextApiRequest,
  res: NextApiResponse<CatImage | string>,
) {
  if (!process.env.API_KEY) {
    res.status(500).json("API key is not set");
    return;
  } else if (!process.env.API_URL) {
    res.status(500).json("API URL is not set");
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}images/search?size=small&mime_types=jpg&format=json&has_breeds=false&order=RANDOM&limit=1`,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
      },
    );
    const { id, url, width, height } = response.data[0];
    const catImage: CatImage = { id, url, width, height };
    res.status(200).send(catImage);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data
        : "Failed to fetch data";
      res.status(error.response?.status ?? 500).json(message);
    } else {
      res.status(500).json("An unknown error occurred");
    }
  }
}
