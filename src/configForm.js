// email:   sienvdbergh@gmail.com
// pw:      Donutello!2022

document.querySelector('#orderThisDonut').addEventListener('click', (e) => {
    e.preventDefault();

    let icingColor = document.querySelector("#icingColor");
    let toppings = document.querySelector('#toppings');

    let customerName = document.querySelector('input[name=clientName]').value;
    let customerEmail = document.querySelector('input[name=clientEmail]').value;
    let amount = document.querySelector('input[name=amount]').value;
    let message = document.querySelector('input[name=message]').value;

    let customerLogo = document.querySelector('#customerLogo').value;
    customerLogo = "https://cdn.logo.com/hotlink-ok/logo-social.png"

    let donutOrder = {
        donut: {
            icing: icingColor.value,
            topping: toppings.value,
            logo: customerLogo
        },
        client: {
            name: customerName,
            email: customerEmail,
        },
        order: {
            amount: amount,
            message: message
        }
    }

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
            window.location.href = "https://the-donut-generator.vercel.app/thankyou.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Something went wrong, please try again later");
        });
});

