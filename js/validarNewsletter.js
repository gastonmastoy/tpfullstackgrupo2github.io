// validarNewsletter.js
function validarEmail() {
    var email = document.getElementById('email').value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var mensajeError = document.getElementById('errorMensaje');

    if (!regex.test(email)) {
        mensajeError.textContent = 'Por favor, ingrese un correo electrónico válido.';
        mensajeError.style.color = 'red';
        return false;
    }

    mensajeError.textContent = '';
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(event) {
        if (!validarEmail()) {
            event.preventDefault();
        }
    });
});
