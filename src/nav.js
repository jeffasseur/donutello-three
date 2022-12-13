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


let orderForm = document.querySelector('.donutForm--order');
let configForm = document.querySelector('.donutForm--config');
let orderButton = document.querySelector('.orderButton');
let closeOrderButton = document.querySelector('.btn--back');

orderButton.addEventListener('click', (e) => {
    configForm.classList.add('hidden');
    orderForm.classList.remove('hidden');
    e.preventDefault();
});

closeOrderButton.addEventListener('click', (e) => {
    configForm.classList.remove('hidden');
    orderForm.classList.add('hidden');
    e.preventDefault();
});