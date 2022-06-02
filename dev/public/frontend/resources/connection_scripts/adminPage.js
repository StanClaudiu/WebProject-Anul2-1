const openDeleteModal = (deletePath, id) => {
    const deleteForm = document.getElementById("delete_form")
    deleteForm.action = `${deletePath}?id=${id}`

    openModal("delete_course")
}

const openEditModal = (readPath, updatePath, id) => {
    const editForm = document.getElementById("edit_form")
    editForm.action = `${updatePath}?id=${id}`///editam ce era in action

    const formItems = {
        "name": document.getElementById("edit_course_name"),
        "parrentCourse": document.getElementById("edit_course_parrentCourse"),
        "description": document.getElementById("edit_course_description"),
        "content": document.getElementById("edit_course_content"),
        "duration": document.getElementById("edit_course_duration"),
        "image": document.getElementById("edit_course_image"),
        "video": document.getElementById("edit_course_video")
    }

    fetch(`${readPath}?id=${id}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            let body = await response.json();

            formItems["name"].value = body["name"]
            formItems["parrentCourse"].value = body["parrentCourseId"]
            formItems["description"].value = body["description"]
            formItems["content"].value = body["content"]
            formItems["duration"].value = body["duration"]
        }
    }).catch((error) => {
        console.log(error)
    })

    openModal("edit_course")
}