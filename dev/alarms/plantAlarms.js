const plantAlarm = async (alarmId, object, ramainingAlarms) => {
    
    if (alarmId != "plantId") return;

    if (ramainingAlarms > 1)
    {
        console.log("Uda petunia : " + object.informatie)
    }
    else {
        console.log("Taie petunia : " + object.informatie)
    }
}

const PlantAlarms = [plantAlarm]

export default PlantAlarms