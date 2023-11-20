console.log("JavaScript is working.");
let name = document.getElementById('name')
let email = document.getElementById('email')
let subject = document.getElementById('subject')
let message = document.getElementById('message')
let inquiry = document.getElementById('inquiry')

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        fetch('/.netlify/functions/send-email', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Email sent!');
                form.reset();
            } else {
                alert('Failed to send email.');
            }
        })
        .catch(error => {
            console.log("An error occurred:", error);
        });
    });
});

// const contactForm = document.querySelector('.contact-form');
// let name = document.getElementById("name");
// let email = document.getElementById("email");
// let subject = document.getElementById("subject");
// let message = document.getElementById("message")

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     let formData = {
//         name: name.value,
//         email: email.value,
//         subject: subject.value,
//         message: message.value
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function() {
//         console.log(xhr.responseText);
//         if(xhr.responseText == 'success'){
//             alert('Email sent!')
//             name.value = '';
//             email.value = '';
//             subject.value = '';
//             message.value = '';
//         }else {
//             alert("Something is wrong!")
//         }
//     }

//     xhr.send(JSON.stringify(formData));
// })