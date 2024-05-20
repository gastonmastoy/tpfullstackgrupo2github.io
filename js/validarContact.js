// const formulario = document.getElementById('formulario');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
// const phoneInput = document.getElementById('phone');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (validateName(name)) {
        // alert('Nombre válido');
        if (validateEmail(email)) {
                alert('Nombre y Correo electrónico Okay');
                alert('Tu Pregunta sera respondida a la brevedad');
            } else {
                alert('Email no válido');
            }
    } else {
        alert('Nombre no válido');
    }
});

function validateEmail(email) {
    const regexemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexemail.test(email)) {
        return false;
    } else{
        return true;
    }
}

function validateName(name) {
     const regex2 = /^[a-zA-ZÀÁÇÈÉÍÏÑÓÖÚÜñáçèéíïñóöúü\s'-]+$/;
    if (!regex2.test(name)) {
        return false;
    }
        return true;
}