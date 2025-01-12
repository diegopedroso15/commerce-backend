import { Request, Response } from "express";
import { registerUserService } from "../../services/login/register-user";

export const registerController = async (req: Request, res: Response) => {
  const { name, surname, email, token, password, repeatPassword } = req.body;

  const serviceResult = await registerUserService({ name, surname, email, token, password, repeatPassword });

  if (serviceResult.code !== 200) {
    return res.status(serviceResult.code).send(serviceResult.message);
  }

  return res.status(serviceResult.code).send();
}