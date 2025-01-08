import { DataSource } from "typeorm";

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    database: process.env.POSTGRES_DB,
    
    synchronize: true,
    logging: false,
    entities: [
        "dist/entities/*.js"
    ],
/*     extra : {
        ssl: {
            rejectUnauthorized: false
        }
    } */
});


AppDataSource.initialize()
.then(() => console.log("Started DataSource"))
.catch(err => console.error("Error during Data Source initialization", err));

