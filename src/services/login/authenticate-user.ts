import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { query } from "../utils/db-utils";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const AuthenticateUserService = async (email: string, password: string) => {
  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const [user] = await query(userQuery, [email]);

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        code: 401,
        message: "Invalid email or password",
      };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      code: 200,
      message: "Authentication successful",
      data: { token },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Server error " + error,
    };
  }
};
