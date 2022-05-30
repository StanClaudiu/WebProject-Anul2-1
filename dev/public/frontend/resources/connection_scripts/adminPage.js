const openDeleteModal = (deletePath, id) => {
    openModal("delete_course")

    const deleteForm = document.getElementById("delete_form")
    deleteForm.action = `${deletePath}?id=${id}`
}