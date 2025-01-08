import { fakerPT_BR as faker } from "@faker-js/faker";
import { IHomologationProfile } from "../../../interfaces/infra/database/repository/homologation-profile-repository";
import { Filter, filteredQuery, query } from "../../../services/utils/db-utils";
import { generateCPF } from "../../../services/utils/generate-cpf";

const allowed_keys = [
  "id", "name", "document", "email", "phone", "address_type",
  "address", "number", "neighborhood", "city", "state", "country",
  "zip_code", "complementary_address", "account_id", "customer_id",
  "latitude", "longitude", "mothers_name", "social_name",
  "date_of_birth", "is_politically_exposed", "is_blocked",
  "is_active", "date",
];

export class HomologationProfileRepository {
  static async get_by_id(id: number): Promise<IHomologationProfile> {
    const profile = await query(
      `SELECT * FROM public.homologation_profiles WHERE id = $1`,
      [id]
    );
    return profile[0];
  }

  static async update_account_id(
    id: number,
    account_id: string
  ): Promise<IHomologationProfile> {
    const profile = await query(
      `UPDATE public.homologation_profiles SET account_id = $1 WHERE id = $2 RETURNING *`,
      [account_id, id]
    );
    return profile[0];
  }

  static async update(
    id: number,
    properties: Record<string, unknown>
  ): Promise<IHomologationProfile> {
    const filter = new Filter(allowed_keys, properties);
    
    const profile = await filteredQuery(
      `UPDATE public.homologation_profiles SET $*1 WHERE id = $1 RETURNING *`,
      [filter], [id], { separator: ", " }
    );
    return profile[0];
  }

  static async update_customer_id(
    id: number,
    customer_id: string
  ): Promise<IHomologationProfile> {
    const profile = await query(
      `UPDATE public.homologation_profiles SET customer_id = $1 WHERE id = $2 RETURNING *`,
      [customer_id, id]
    );
    return profile[0];
  }

  static async create_fake_profile(): Promise<IHomologationProfile> {
    const sex = faker.person.sexType();
    const social_name = faker.person.firstName(sex);
    const full_name = faker.person.fullName({ firstName: social_name, sex });

    const profile = await query(
      `INSERT INTO public.homologation_profiles (
        name,
        document,
        email,
        phone,
        address_type,
        address,
        number,
        neighborhood,
        city,
        state,
        country,
        zip_code,
        complementary_address,
        account_id,
        customer_id,
        latitude,
        longitude,
        mothers_name,
        social_name,
        is_politically_exposed,
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20
      ) RETURNING *`,

      [
        full_name,
        generateCPF(),
        faker.internet.email(),
        faker.phone.number(),
        "RESIDENTIAL",
        faker.location.streetAddress(),
        faker.location.buildingNumber(),
        "MARANDUBA",
        faker.location.city(),
        faker.location.state(),
        faker.location.country(),
        faker.location.zipCode(),
        "",                                        // complementary_address
        "",                                        // account_id
        "",                                        // customer_id
        faker.location.latitude(),
        faker.location.longitude(),
        faker.person.fullName({ sex: 'female' }),  // mothers_name
        social_name,
        faker.datatype.boolean(0.1),               // is_politically_exposed
      ]
    );
    return profile[0];
  }
}