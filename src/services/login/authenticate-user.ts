import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

export const AuthenticateUserService = async (username: string, password: string) => {
  try {
    const prisma = new PrismaClient();
    const pswd = await prisma.users.findFirst({
      where: {
        username: username,
      },
      select: {
        password: true,
      }
    });
    
    if (!pswd) {
      return {
        code: 401,
        message: "Invalid credentials"
      };
    };
    
    const match = await bcrypt.compare(password, pswd.password);

    if (!match) {
      return {
        code: 401,
        message: "Invalid credentials"
      };
    }

    const user = await prisma.users.findFirst({
      where: { username: username },
    });

    const token = jwt.sign({ username }, "senha", { expiresIn: "1d" });

    await prisma.users.update({
      where: { username: username },
      data: {
        token: token,
        expires_in: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      }
    })

    await prisma.$disconnect();
    return {
      code: 200,
      message: "User authenticated successfully",
      token,
      isAdmin: user?.admin_user
    };
  } catch (error) {
    return {
      code: 500,
      message: "Server error " + error,
    };
  }
};
