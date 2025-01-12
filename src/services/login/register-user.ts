import { query } from "../utils/db-utils";
import bcrypt from "bcrypt";

interface RegisterUser {
  name: string;
  surname: string;
  email: string;
  token: string;
  password: string;
  repeatPassword: string;
}

export const registerUserService = async (data: RegisterUser) => {
  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const [user] = await query(userQuery, [data.email]);

    if (user) {
      return {
        code: 409,
        message: "User already exists",
      };
    }

    if (data.password !== data.repeatPassword) {
      return {
        code: 400,
        message: "Passwords do not match",
      };
    }

    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const insertQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    await query(insertQuery, [data.name + ' ' + data.surname, data.email, encryptedPassword]);

    return {
      code: 200,
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      code: 500,
      message: "Server error " + error,
    };
  }
}
