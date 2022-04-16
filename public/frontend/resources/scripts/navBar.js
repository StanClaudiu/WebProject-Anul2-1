const openHamburgerNavbar = () => {
    const hamburger = document.getElementById("nav-bar-hamburger-element");
    hamburger.classList.add("nav-bar-hamburger-active");
}

const closeHamburgerNavbar = () => {
    const hamburger = document.getElementById("nav-bar-hamburger-element");
    hamburger.classList.remove("nav-bar-hamburger-active");
}