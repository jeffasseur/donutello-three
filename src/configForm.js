let icingColor = document.querySelector("#icingColor").value;
let toppings = document.querySelector('#toppings').value;

let customerName = document.querySelector('#customerName').value;
let customerEmail = document.querySelector('#customerEmail').value;
let amount = document.querySelector('#amount').value;
let message = document.querySelector('#message').value;

let customerLogo = document.querySelector('#customerLogo').value;

let donutOrder = {
    donut : {
        icing : icingColor,
        topping : toppings,
        //logo: logo
    },
    client : {
        name : customerName,
        email : customerEmail,
    },
    order : {
        amount : amount,
        message : message
    }
}

let order = document.querySelector('#orderThisDonut');
order.addEventListener('click', (e) => {
    console.log(donutOrder);
    e.preventDefault();
});


