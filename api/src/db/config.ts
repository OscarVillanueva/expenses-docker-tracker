
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: Deno.env.get("DB_HOST"),
  password: Deno.env.get("DB_PASSWORD"),
  user: Deno.env.get("DB_USERNAME"),
  database: Deno.env.get("DB_NAME"),
});

export const db = drizzle({ client: connection });

console.log(db)

console.log("Connected to the database successfully")
