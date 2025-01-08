import { PrismaClient } from "@prisma/client";

export const getUserFromToken = async (req: any, res: any) => {

    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    } else {
        authHeader = authHeader.replace(/['"]+/g, "");
    }

    try {
        const prisma = new PrismaClient();
        const user = await prisma.users.findFirst({
            where: { token: authHeader }
        });
        return user;
    } catch (error) {
        return error;
    }

}