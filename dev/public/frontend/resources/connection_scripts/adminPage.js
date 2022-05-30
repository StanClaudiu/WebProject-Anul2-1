const openDeleteModal = (deletePath, id) => {
    const deleteForm = document.getElementById("delete_form")
    deleteForm.action = `${deletePath}?id=${id}`

    openModal("delete_course")
}

const openEditModal = (readPath, updatePath, id) => {
    const editForm = document.getElementById("edit_form")
    editForm.action = `${updatePath}?id=${id}`

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

            console.log(body["name"])
        }
    }).catch((error) => {
        console.log(error)
    })

    openModal("edit_course")
}