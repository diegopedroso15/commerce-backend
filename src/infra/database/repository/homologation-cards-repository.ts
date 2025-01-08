import { IHomologationCard } from "../../../interfaces/infra/database/repository/homologation-card-repository";
import { query } from "../../../services/utils/db-utils";

export class HomologationCardsRepository {
  static async create(
    homologation_card: IHomologationCard
  ): Promise<IHomologationCard> {
    const card = await query(
      `INSERT INTO public.homologation_cards (name, embossing_name, cvv, type, pan, password, profile_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        homologation_card.name,
        homologation_card.embossing_name,
        homologation_card.cvv,
        homologation_card.type,
        homologation_card.pan,
        homologation_card.password,
        homologation_card.profile_id,
      ]
    );
    return card[0];
  }

  static async get_by_id(id: number): Promise<IHomologationCard> {
    const card = await query(
      `SELECT * FROM public.homologation_cards WHERE id = $1`,
      [id]
    );
    return card[0];
  }

  static async get_by_card_id(card_id: string): Promise<IHomologationCard> {
    const card = await query(
      `SELECT * FROM public.homologation_cards WHERE card_id = $1`,
      [card_id]
    );
    return card[0];
  }
  static async update_cvv_by_card_id(
    card_id: string,
    cvv: string
  ): Promise<IHomologationCard> {
    const card = await query(
      `UPDATE public.homologation_cards SET cvv = $1 WHERE card_id = $2 RETURNING *`,
      [cvv, card_id]
    );
    return card[0];
  }

  static async update_pan_by_card_id(
    card_id: string,
    pan: string
  ): Promise<IHomologationCard> {
    const card = await query(
      `UPDATE public.homologation_cards SET pan = $1 WHERE card_id = $2 RETURNING *`,
      [pan, card_id]
    );
    return card[0];
  }

  static async update_password_by_card_id(
    card_id: string,
    password: string
  ): Promise<IHomologationCard> {
    const card = await query(
      `UPDATE public.homologation_cards SET password = $1 WHERE card_id = $2 RETURNING *`,
      [password, card_id]
    );
    return card[0];
  }

  static async block_card_by_card_id(
    card_id: string
  ): Promise<IHomologationCard> {
    const card = await query(
      `UPDATE public.homologation_cards SET is_blocked = true WHERE card_id = $1 RETURNING *`,
      [card_id]
    );
    return card[0];
  }

  static async unblock_card_by_card_id(
    card_id: string
  ): Promise<IHomologationCard> {
    const card = await query(
      `UPDATE public.homologation_cards SET is_blocked = false WHERE card_id = $1 RETURNING *`,
      [card_id]
    );
    return card[0];
  }

  static async delete_by_card_id(card_id: string): Promise<IHomologationCard> {
    const card = await query(
      `DELETE FROM public.homologation_cards WHERE card_id = $1 RETURNING *`,
      [card_id]
    );
    return card[0];
  }
}
