const updateProgressOnServer = async (updateProgressPath, progressPercent) => {
    return (await new Promise((resolve, reject) => {

        fetch(updateProgressPath, {
            method: 'post',
            body: JSON.stringify({"progress": progressPercent}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response
        }).then(async (response) => {
            if (response.status === 200) {
                resolve(true)
            } 
            
            resolve(false)

        }).catch((error) => {
            resolve(false)
        })
    }))
}

const onVideoTimeUpdate = async (supervisor, videoElement, updateProgressPath) => {
    progressPercent = Math.trunc((videoElement.currentTime / videoElement.duration) * 100)

    console.log(progressPercent)
    console.log("-------------")
    console.log((supervisor.currentProgress + 0.2 * supervisor.currentProgress))

    if (progressPercent > (supervisor.currentProgress + 0.2 * supervisor.currentProgress)) {

        updatedOk = await updateProgressOnServer(updateProgressPath, progressPercent)
        
        if (!updatedOk) {
            console.log("Failed to update progress")
            return
        }

        supervisor.currentProgress = progressPercent
    }
}

const onVideoEnded = async (supervisor, updateProgressPath) => {

    updatedOk = await updateProgressOnServer(updateProgressPath, 100)

    if (!updatedOk) {
        console.log("Failed to update progress")
        return
    }

    supervisor.currentProgress = 100
}


class CourseCompletionSupervisor {
    currentProgress

    setup (startingProgress, updateProgressPath) {
       this.currentProgress = startingProgress
       
       const videoElement = document.getElementById("course_content_video")
   
       videoElement.ontimeupdate = () => onVideoTimeUpdate(this, videoElement, updateProgressPath)
       videoElement.onended = () => onVideoEnded(this, updateProgressPath)
   }
}

