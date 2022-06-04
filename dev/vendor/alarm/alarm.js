class Alarm {
    alarms
    playbackSpeed

    constructor(playbackSpeed) {
        this.alarms = []
        this.playbackSpeed = playbackSpeed
    }

    //object MUST be POJO
    addAlarm(alarmId, object, raiseOnceIn, ramainingAlarms) {
        this.alarms.push({
            alarmId: alarmId, 
            object: object, 
            raiseOnceIn: raiseOnceIn, 
            ramainingAlarms: ramainingAlarms,
            shouldBeRaisedBefore: new Date()
        })
    }

    async callAlarms(alarmListeners) {

        for (let it = 0; it < this.alarms.length; it++) {

            let alarm = this.alarms[it]

            if (new Date() <= alarm.shouldBeRaisedBefore) continue

            for (let jt = 0; jt < alarmListeners.length; jt++) 
            {
                let alarmListener = alarmListeners[jt]
                await alarmListener(alarm.alarmId, alarm.object, alarm.ramainingAlarms - 1)
            }

            if (alarm.ramainingAlarms - 1 < 1) 
            {
                this.alarms.splice(it, 1)
            }
            else 
            {
                this.alarms[it].ramainingAlarms = this.alarms[it].ramainingAlarms - 1

                let currentDate = new Date()
                let raiseBefore = currentDate.setMinutes(currentDate.getMinutes() + 
                                                        Math.trunc(this.alarms[it].raiseOnceIn / this.playbackSpeed))
                this.alarms[it].shouldBeRaisedBefore = raiseBefore;
            }
        }
    }

    serializeAlarms() {

    }
}

export default Alarm;