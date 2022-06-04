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