const searchCourses = (hostPath, searchPath) => {

    const searchName = document.getElementById("serach_box_input").value

    fetch(`${searchPath}`, {
        method: 'post',
        body: JSON.stringify({"searchName": searchName}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            let body = await response.json();
            displayCourses(hostPath, body["courses"])
        }
    }).catch((error) => {
        console.log(error)
    })
}

const displayCourses = (hostPath, courses) => {
    
    const displayCoursesHTML =  courses.map(course => {
        const progressStyle = `style="width: ${course.computedProgress == null ? 0 : course.computedProgress}%;"`
        return `
            <div class="course-summary" onclick="location.href='${hostPath}/course?id=${course.id}'">
                <div class="course-summary-row course-summary-image-and-text-container">
                    <div class="course-summary-image">
                        <img alt="course-image" src="${course.imgPath}" />
                    </div>
                    <div class="course-summary-text">
                        <div>${course.name}</div>
                    </div>
                </div>
                <div class="course-summary-row course-summary-progress-container">
                    <div>Progress</div>
                    <div class="progress-bar">
                        <div ${progressStyle}></div>
                    </div>
                </div>
            </div>
        `
    }).join("\n")

    let courses_list = document.getElementById("list_of_available_courses")

    courses_list.innerHTML = displayCoursesHTML
}