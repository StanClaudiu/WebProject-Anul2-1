const openPlantModal = (readPath,id) => {

    const injection_point = document.getElementById("inject_plants"); //din modalul edit_plants

    fetch(`${readPath}?id=${id}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json' //il transforma node.js in content-type
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            let body = await response.json();
            ///now that we have the data let's make it nice and put in in the page
            console.log(body);
            injection_point.innerHTML = await body.map(elem => 
            `<div id = "plant${elem.id}" class="plant_formated">
                <div >${elem.plant_name}</div>
                <div><i class="fa-solid fa-xmark" onclick = "openDeleteModal('${elem.id}')" ></i></div>
             </div>`
            ).join('\n')
        }
    }).catch((error) => {
        console.log(error)
    })

    openModal("inspect_plant_modal")
}

const openDeleteModal = (id) => {
    document.getElementById("submiter_of_delete").setAttribute("onclick",`delete_plant(${id})`);
    openModal('delete_plant_modal');
}

const delete_plant = (id) => {
     document.getElementById(`plant${id}`).style = "display:none";
     ///I will make the request for deletion
        fetch(`/api/v1/myGarden/del?id=${id}`, {
        method: 'get',
        headers: {
             //il transforma node.js in content-type
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            ///now that we have the data let's make it nice and put in in the page
            console.log("It was deleted succesfully"); 
        }
    }).catch((error) => {
        console.log(error)
    })
    closeModal('delete_plant_modal');
    console.log('I am trying to close the modal');

}
