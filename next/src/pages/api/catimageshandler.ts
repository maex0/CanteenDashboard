import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { CatImage } from "@prisma/client";

const MAX_LIKED_CAT_IMAGES = process.env.MAX_LIKED_CAT_IMAGES
  ? parseInt(process.env.MAX_LIKED_CAT_IMAGES)
  : 3;

/**
 * This function is the handler for the /api/catimageshandler endpoint.
 * It supports GET and POST methods.
 *
 * GET: Fetches a list of cat images from the database, ordered by creation date in descending order.
 * The number of images fetched is determined by the MAX_LIKED_CAT_IMAGES environment variable, with a default of 3.
 * If fetching fails, it returns a 500 status code with an error message.
 *
 * POST: Attempts to save a new cat image to the database.
 * The cat image data should be included in the request body.
 * If a cat image with the same ID already exists, it returns a 409 status code with an error message.
 * If saving the cat image fails, it returns a 500 status code with an error message.
 *
 * For any other HTTP method, it returns a 405 status code and sets the 'Allow' header to 'GET, POST'.
 *
 * @param req - The incoming request. For POST requests, the body should contain the cat image data.
 * @param res - The outgoing response. Contains the fetched cat images for GET requests, or the saved cat image for POST requests.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const catImages = await prisma.catImage.findMany({
        orderBy: { createdAt: "desc" },
        take: MAX_LIKED_CAT_IMAGES,
      });

      res.status(200).json(catImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch cat images." });
    }
  } else if (req.method === "POST") {
    try {
      const catImage: CatImage = req.body;

      const id = catImage.id;
      const existingCatImage = await prisma.catImage.findUnique({
        where: { id },
      });

      if (existingCatImage) {
        res.status(409).json({ error: "Cat image already exists." });
        return;
      }

      const newCatImage = await prisma.catImage.create({
        data: catImage,
      });

      res.status(201).json(newCatImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save cat image." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
