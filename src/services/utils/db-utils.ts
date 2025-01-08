import { AppDataSource } from "../../data-source";
import logger from "../../utils/logger/default.logs";

export async function query(query: string, params?: any[]) {
    try {
        logger.info(`Executing query "${query}" with params: ${params}`);
        return await AppDataSource.query(query, params);
    } catch (error: any) {
        logger.error("Err in query execution: " + error.message);
        logger.error("Query: " + query);
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

/*

## Example:

const filter = new Filter(
    ["id", "name", "email", "phone"],  // allowed keys
    req.query                          // selected filters
);

const result = await filteredQuery(
    `SELECT * FROM table WHERE $*1 LIMIT $1 OFFSET $2`,
    [filter], [pageSize, offset]
);

This function replaces $*1, $*2, ... with the WHERE clauses

*/
export async function filteredQuery(
    query_str: string,
    filters: Filter[],
    params?: any[],
    options = { separator: " AND " },
): Promise<any> {
    params = params || [];

    const append_param = (param: any) => {
        params.push(param);
        return params.length;  // 1-based indexing
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
