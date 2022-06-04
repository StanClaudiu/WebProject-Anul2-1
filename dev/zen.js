import { OracleDatabase } from "./vendor/database/index.js";
import { SeedAdmins, SeedPlantTypes } from "./seeder/index.js"
import { App } from "./vendor/index.js";
import { Alarm } from "./vendor/alarm/index.js"
import { PlantAlarms } from "./alarms/index.js"
import { SendMail } from "./vendor/mailer/index.js"
import { FileManager } from "./vendor/fileManager/index.js"
import { mainRoutes } from "./routes/web/index.js";
import { authRoutes } from "./routes/api/index.js";
import "dotenv/config"

const db = new OracleDatabase()
await db.connect()

if (parseInt(process.env.DB_INIT_ENVIRONMENT) == 1) {
    await db.initEnvironment();
}

if (parseInt(process.env.DB_SEED) == 1) {
    await SeedAdmins(db, FileManager)
    await SeedPlantTypes(db, FileManager)
}

const alarm = new Alarm(parseInt(process.env.ALARM_PLAYBACK_SPEED))

setInterval(() => { alarm.callAlarms(db, SendMail, [...PlantAlarms]) }, 
    parseInt(process.env.ALARM_CHECK_ONCE_IN))

const app = new App(process.env.PORT || 4000, db, FileManager, SendMail, alarm)
app.useRoute(mainRoutes)
app.useRoute(authRoutes)

app.listen();