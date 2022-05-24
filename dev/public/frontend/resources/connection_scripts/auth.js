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
    }).then(async (response) => {
        if (response.status === 201) {
            let body = await response.json();

            if (body["role"] == "user") {
                window.location.href = "/courses";
            }
            else if (body["role"] == "admin") {
                window.location.href = "/adminPage";
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}

const customLoginHandle = (formElement) => {
    const loginData = handleSubmit(formElement)
    console.log(JSON.stringify(loginData))
    fetch("/api/v1/login", {
        method: 'post',
        body: JSON.stringify(loginData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response
    }).then(async (response) => {
        if (response.status === 200) {
            let body = await response.json();

            if (body["role"] == "user") {
                window.location.href = "/courses";
            }
            else if (body["role"] == "admin") {
                window.location.href = "/adminPage";
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}

const addCustomRegisterHandle = (id) => {
    document.getElementById(id).addEventListener("submit", customRegisterHandle);
}

const addCustomLoginHandle = (id) => {
    document.getElementById(id).addEventListener("submit", customLoginHandle);
}
