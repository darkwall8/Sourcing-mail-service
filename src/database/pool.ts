import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();


const pool: Pool = new Pool({
    user: process.env.BD_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE_NAME
});

export default pool