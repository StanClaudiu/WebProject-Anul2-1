import { MySqlDatabase } from "./vendor/database/index.js";
import { App } from "./vendor/index.js";
import { mainRoutes } from "./routes/web/index.js";
import "dotenv/config"

app = new App(process.env.PORT || 4000, MySqlDatabase)
app.useWebRoute(mainRoutes)


app.listen();