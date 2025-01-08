import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/login/authenticate-user";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça usuário e senha." });
  }

  const serviceResult = await AuthenticateUserService(username, password);

  if (serviceResult.code !== 200) {
    return res.status(serviceResult.code).send(serviceResult.message);
  }

  return res.status(serviceResult.code).send([serviceResult.token, serviceResult.isAdmin]);
};
