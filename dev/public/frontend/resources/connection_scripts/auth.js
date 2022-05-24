const handleSubmit = (formElement) => {
    formElement.preventDefault();
    let data = {};

    [...formElement.currentTarget.elements]
        .filter((inputElement) => inputElement.type !== "submit")
        .forEach((inputElement) => {
            data[inputElement.getAttribute("name")] = inputElement.type === "file" ? inputElement.files : inputElement.value
        });

    return data
};

const customRegisterHandle = (formElement) => {
    const signUpData = handleSubmit(formElement)
    console.log(JSON.stringify(signUpData))
    fetch("/api/v1/register", {
        method: 'post',
        body: JSON.stringify(signUpData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response
    }).then((response) => {
        if (response.status === 201) {
            console.log("Post successfully created!")
        }
    }).catch((error) => {
        console.log(error)
    })
}

const addCustomRegisterHandle = (id) => {
    document.getElementById(id).addEventListener("submit", customRegisterHandle);
}
