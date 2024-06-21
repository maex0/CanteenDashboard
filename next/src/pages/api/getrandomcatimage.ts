import { CatImage } from "@prisma/client";
import axios, { AxiosError } from "axios";

import { NextApiRequest, NextApiResponse } from "next";

/**
 * `GET` is an asynchronous function that fetches a random Cat image from TheCatAPI.
 * @param req - The incoming request object from Next.js
 * @param res - The response object from Next.js
 * @returns A Promise that resolves to a NextResponse object containing the fetched data if the request is successful, or an object with an error message if the request fails.
 * @throws Throws an error if the request fails.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CatImage | string>,
) {
  if (req.method === "GET") {
    if (!process.env.API_KEY) {
      res.status(500).json("API key is not set");
      return;
    }
    if (!process.env.API_URL) {
      res.status(500).json("API URL is not set");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.API_URL}images/search?size=small&mime_types=jpg&format=json&has_breeds=false&order=RANDOM&limit=1`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY,
          },
        },
      );

      const catImage = response.data[0];

      const myCatImage: CatImage = {
        id: catImage.id,
        url: catImage.url,
        width: catImage.width,
        height: catImage.height,
        createdAt: new Date(),
      };

      res.status(200).send(myCatImage);
    } catch (error) {
      handleError(error, res);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function handleError(error: unknown, res: NextApiResponse<string>) {
  if (isAxiosError(error)) {
    const message = error.response
      ? String(error.response.data)
      : "Failed to fetch data";
    res.status(error.response?.status ?? 500).json(message);
  } else {
    res.status(500).json("An unknown error occurred");
  }
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
