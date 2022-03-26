import { config } from "dotenv";
config();

import { connect } from "mongoose";
import app from "app";

const PORT = process.env.PORT;
const DB_URI = process.env.MONGO_URI;
const JWT_KEY = process.env.JWT_KEY;

async function connection(uri: string) {
    try {
        connect(uri);
        console.log("DB Connected");
    } catch (error) {
        process.exit(1);
    }
}

(async () => {
    if (!DB_URI) throw new Error("DB Url must be define");
    if (!JWT_KEY) throw new Error("JWT Key must be define");
    await connection(DB_URI);
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
})();
