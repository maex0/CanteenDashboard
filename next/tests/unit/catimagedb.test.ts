/**
 * @jest-environment jsdom
 */

// catImages.test.ts
import { NextApiRequest, NextApiResponse } from "next";
import handler from "../../src/pages/api/catimagedb";

jest.mock("../../src/lib/prisma", () => ({
  catImage: {
    findMany: jest.fn().mockImplementation(() => {
      throw new Error("Database is offline");
    }),
    findUnique: jest.fn().mockImplementation(() => {
      throw new Error("Database is offline");
    }),
    create: jest.fn().mockImplementation(() => {
      throw new Error("Database is offline");
    }),
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

  it("should return 500 if the database is offline (GET)", async () => {
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch cat images.",
    });
  });

  it("should return 500 if the database is offline (POST)", async () => {
    req.method = "POST";
    req.body = { id: "1", url: "http://example.com/cat1.jpg" };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to save cat image.",
    });
  });
});
