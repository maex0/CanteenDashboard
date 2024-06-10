/**
 * @jest-environment jsdom
 */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/lib/prisma";
import handler from "../../src/pages/api/api-catImagesHandler";
import { CatImage } from "@prisma/client";

jest.mock("../../src/lib/prisma", () => ({
  catImage: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe("catImages API", () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: "GET",
      body: {},
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    } as unknown as NextApiResponse;
  });

  it("should return cat images if the database is online (GET)", async () => {
    const mockCatImages: CatImage[] = [
      {
        id: "1",
        url: "http://example.com/cat1.jpg",
        width: 30,
        height: 30,
        createdAt: new Date(),
      },
      {
        id: "2",
        url: "http://example.com/cat2.jpg",
        width: 30,
        height: 30,
        createdAt: new Date(),
      },
    ];
    (prisma.catImage.findMany as jest.Mock).mockResolvedValue(mockCatImages);

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCatImages);
  });

  it("should return 409 if the cat image already exists (POST)", async () => {
    req.method = "POST";
    req.body = { id: "1", url: "http://example.com/cat1.jpg" };

    const mockCatImage: CatImage = req.body;
    (prisma.catImage.findUnique as jest.Mock).mockResolvedValue(mockCatImage);

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cat image already exists.",
    });
  });

  it("should return the new cat image if it is successfully saved (POST)", async () => {
    req.method = "POST";
    req.body = { id: "3", url: "http://example.com/cat3.jpg" };

    const mockCatImage: CatImage = req.body;
    (prisma.catImage.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.catImage.create as jest.Mock).mockResolvedValue(mockCatImage);

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCatImage);
  });
});
