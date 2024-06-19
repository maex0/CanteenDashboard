import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles the health check API request.
 *
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 * @returns A JSON response with the application's health status, uptime, message, and timestamp.
 */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const startTime = process.uptime(); // Get the uptime of the application in seconds

  res.status(200).json({
    status: "healthy",
    uptime: startTime,
    message: "Application is running",
    timestamp: new Date().toISOString(),
  });
}
