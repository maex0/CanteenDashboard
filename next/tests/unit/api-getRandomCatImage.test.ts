/**
 * @jest-environment jsdom
 */

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import CatImage from "../../src/types/catImage";
import handler from "../../src/pages/api/api-getRandomCatImage";

jest.mock("axios");

describe("catimageapi", () => {
  let req: NextApiRequest;
  let res: NextApiResponse<CatImage | string>;

  beforeEach(() => {
    req = {
      method: "GET",
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    } as unknown as NextApiResponse<CatImage | string>;

    process.env.API_KEY = "test_api_key";
    process.env.API_URL = "http://test-api-url.com/";
  });

  it("should return a cat image if the request is successful", async () => {
    const mockCatImage: CatImage = {
      id: "1",
      url: "http://example.com/cat1.jpg",
      width: 500,
      height: 500,
    };

    (axios.get as jest.Mock).mockResolvedValue({
      data: [mockCatImage],
    });

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockCatImage);
  });

  it("should return an error if the API key is not set", async () => {
    delete process.env.API_KEY;

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("API key is not set");
  });

  it("should return an error if the API URL is not set", async () => {
    delete process.env.API_URL;

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("API URL is not set");
  });

  it("should return 405 if the method is not GET", async () => {
    req.method = "POST";

    await handler(req, res);
    expect(res.setHeader).toHaveBeenCalledWith("Allow", ["GET"]);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith("Method POST Not Allowed");
  });
});
