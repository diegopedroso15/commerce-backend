import { NextFunction, Request, Response } from "express";
import { query } from "../../services/utils/db-utils";

export const validateEmailToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, token } = req.body;
    const userQuery = "SELECT * FROM tokens WHERE email = $1 AND token = $2";
    const [user] = await query(userQuery, [email, token]);

    if (!user) {
      return res.status(404).send({ message: "Invalid token" })
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Server error " + error });
  }
};
