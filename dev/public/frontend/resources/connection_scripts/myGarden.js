const openPlantModal = (readPath,id) => {

    const injection_point = document.getElementById("inject_plants"); //din modalul edit_plants

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

            injection_point.innerHTML = body["salut"];
            console.log("----------------------------------");
        }
    }).catch((error) => {
        console.log(error)
    })

    openModal("inspect_plant_modal")
}
