const openPlantModal = () => {

    const formItems = {
        "element_modal_dot": document.getElementById("element_modal_dot")
    }

    fetch(`/api/v1/myGarden/read`, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            let body = await response.json();

            formItems["element_modal_dot"].innerHTML = body["salut"]
        }
    }).catch((error) => {
        console.log(error)
    })

    openModal("inspect_trees_modal")
}
