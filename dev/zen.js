import { OracleDatabase } from "./vendor/database/index.js";
import { App } from "./vendor/index.js";
import { mainRoutes } from "./routes/web/index.js";
import "dotenv/config"

const db = new OracleDatabase()
const app = new App(process.env.PORT || 4000, db)
app.useWebRoute(mainRoutes)


app.listen();