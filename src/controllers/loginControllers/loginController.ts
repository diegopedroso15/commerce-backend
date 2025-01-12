import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/login/authenticate-user";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const serviceResult = await AuthenticateUserService(email, password);

  if (serviceResult.code !== 200) {
    return res.status(serviceResult.code).send(serviceResult.message);
  }

  if (!serviceResult.data) {
    return res.status(500).send("Internal server error");
  }

  return res.status(serviceResult.code).send([serviceResult.data.token]);
};
