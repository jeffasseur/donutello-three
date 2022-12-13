let icingColor = document.querySelector("#icingColor");
let toppings = document.querySelector('#toppings');

let customerName = document.querySelector('[name="name"]').value;
let customerEmail = document.querySelector('[name=email]').value;
let amount = document.querySelector('[name=amount]').value;
let message = document.querySelector('[name=message]').value;

let customerLogo = document.querySelector('#customerLogo').value;


// let donutOrder = {
//     donut : {
//         icing : icingColor.value,
//         topping : toppings.value,
//         logo: "https://cdn.logo.com/hotlink-ok/logo-social.png"
//     },
//     client : {
//         name : customerName,
//         email : customerEmail,
//     },
//     order : {
//         amount : amount,
//         message : message
//     }
// }

let donutConfig = document.querySelector('.bakeForm');
donutConfig.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const donutOrder = Object.fromEntries(data.entries());
    console.log(donutOrder);
    
    fetch('https://donutello-backend-n95w.onrender.com/api/v1/donuts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donutOrder)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

