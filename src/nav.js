let navbar = document.querySelector(".navbar");
let button = document.querySelector(".navbar-toggler");
let navContent = document.querySelector("#navbarSupportedContent");

button.addEventListener("click", function() {
    if (button.classList.contains("collapsed")) {
        button.classList.remove("collapsed");
        navContent.classList.add("show");
    } else {
        button.classList.add("collapsed");
        navContent.classList.remove("show");
    }
});