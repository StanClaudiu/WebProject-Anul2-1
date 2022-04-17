const openModal = (modalId) => {
    modalContainer = document.getElementById(modalId)
    bodyRoot = document.getElementById('body_root');
    modalContainer.classList.add('modal_container_show')
    bodyRoot.classList.add('modal-hide-body-overflow')
}

const closeModal = (modalId) => {
    modalContainer = document.getElementById(modalId)
    bodyRoot = document.getElementById('body_root');
    modalContainer.classList.remove('modal_container_show')
    bodyRoot.classList.remove('modal-hide-body-overflow')
}