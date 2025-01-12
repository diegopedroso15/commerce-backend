import { Request, Response } from "express";
import { query } from "../../services/utils/db-utils";

export const sendEmailTokenController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = Math.floor(100000 + Math.random() * 900000);

    const tokenExists = await query("SELECT * FROM tokens WHERE email = $1", [email]);

    if (tokenExists.length) {
      await query("UPDATE tokens SET token = $1 WHERE email = $2", [token, email]);
      return res.status(200).send({ message: "Token atualizado com sucesso" });
    }

    await query("INSERT INTO tokens (email, token) VALUES ($1, $2)", [email, token]);

    // TODO: Enviar o token por e-mail
    return res.status(200).send({ message: "Token enviado com sucesso" });
  } catch (error) {
    console.error("Erro ao gerar o token:", error);
    return res.status(500).send({ message: "Erro no servidor" });
  }
};
