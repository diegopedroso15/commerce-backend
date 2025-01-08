import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  } else {
    authHeader = authHeader.replace(/['"]+/g, "");
  }

  try {
    const prisma = new PrismaClient();

    const user = await prisma.users.findFirst({
      where: {
        token: authHeader,
        expires_in: { gt: new Date() }
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
