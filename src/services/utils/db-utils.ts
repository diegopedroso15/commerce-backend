import { AppDataSource } from "../../data-source";

export async function query(query: string, params?: any[]) {
    try {
        console.info(`Executing query "${query}" with params: ${params}`);
        return await AppDataSource.query(query, params);
    } catch (error: any) {
        console.error("Err in query execution: " + error.message);
        console.error("Query: " + query);
        throw new Error("Err in query execution: " + error.message);
    }
}

export class Filter {
    allowed_keys : string[];
    filters      : Record<string, any>;

    constructor(allowed_keys: string[], filters: Record<string, any>) {
        this.allowed_keys = allowed_keys;
        this.filters = filters;
    }
};

export async function filteredQuery(
    query_str: string,
    filters: Filter[],
    params?: any[],
    options = { separator: " AND " },
): Promise<any> {
    params = params || [];

    const append_param = (param: any) => {
        params.push(param);
        return params.length;
    }

    for (const [index, filter] of filters.entries()) {
        const where_clause =
            Object.entries(filter.filters)
            .filter(([key, value]) => filter.allowed_keys.includes(key) && value)
            .map(([key, value]) => `${key} = $${append_param(value)}`)
            .join(options.separator);

        query_str = query_str.replace(
            `$*${index + 1}`,
            where_clause || '1 = 1'
        );
    }

    return query(query_str, params);
}
