import { OracleDatabase } from "./vendor/database/index.js";
import { SeedAdmins } from "./seder/index.js"
import { App } from "./vendor/index.js";
import { mainRoutes } from "./routes/web/index.js";
import { authRoutes } from "./routes/api/index.js";
import "dotenv/config"

const db = new OracleDatabase()
await db.connect()

if (parseInt(process.env.DB_INIT_ENVIRONMENT) == 1) {
    await db.initEnvironment();
}

if (parseInt(process.env.DB_SEED) == 1) {
    await SeedAdmins(db)
}

const app = new App(process.env.PORT || 4000, db)
app.useRoute(mainRoutes)
app.useRoute(authRoutes)


app.listen();