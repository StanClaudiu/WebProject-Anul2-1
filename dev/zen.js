import { OracleDatabase } from "./vendor/database/index.js";
import { App } from "./vendor/index.js";
import { mainRoutes } from "./routes/web/index.js";
import "dotenv/config"

const app = new App(process.env.PORT || 4000, OracleDatabase)
app.useWebRoute(mainRoutes)


app.listen();