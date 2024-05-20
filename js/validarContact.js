const formulario = document.getElementById('formulario');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
// const phoneInput = document.getElementById('phone');
var mensajeError = document.getElementById('errorMensaje');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (validateName(name)) {
        if (validateEmail(email)) {
                alert('Nombre y Correo electrónico Okay');
                mensajeError.textContent = 'Tu pregunta sera respondida a la brevedad';
                mensajeError.style.color = 'green';
                formulario.reset(); // Limpia formulario
            } else {
                mensajeError.textContent = 'Por favor, ingrese un Email válido';
                mensajeError.style.color = 'red';
            }
    } else {
        mensajeError.textContent = 'Por favor, ingrese Nombre válido';
        mensajeError.style.color = 'red';
    }
});

// Funcion valida email
function validateEmail(email) {
    const regexemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexemail.test(email)) {
        return false;
    } else{
        return true;
    }
}

// Funcion valida nombre
function validateName(name) {
     const regex2 = /^[a-zA-ZÀÁÇÈÉÍÏÑÓÖÚÜñáçèéíïñóöúü\s'-]+$/;
    if (!regex2.test(name)) {
        return false;
    }
        return true;
}