import { Reminder } from "../models/index.js";

const conifereAlarm = async (alarmId, db, sendMail, object, ramainingAlarms) => {

    if (alarmId != 1) return;

    if (ramainingAlarms == 9)
    {
        const reminder = new Reminder(db, object["id"], 
            "Read about conifere on our courses page")

        await reminder.create()
    }
    else {
        const reminder = new Reminder(db, object["id"], 
            "Take care about " + object["plant_name"] + " the conifer")
        
        await reminder.create()
    }
}

const foioaseAlarm = async (alarmId, object, ramainingAlarms) => {
    
    if (alarmId != 2) return;

}

const fructeAlarm = async (alarmId, object, ramainingAlarms) => {
    
    if (alarmId != 2) return;

}

const legumeAlarm = async (alarmId, object, ramainingAlarms) => {
    
    if (alarmId != 2) return;

}

const PlantAlarms = [conifereAlarm, foioaseAlarm, fructeAlarm, legumeAlarm]

export default PlantAlarms