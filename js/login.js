const formulario_login = document.getElementById('formulario_login');


//bandera formulario login
const campos= {
    usuario_login: false,
    password_login: false
}




function validarCampo(expresion,input,campo) {
    if(input == '' || !expresion.test(input)){
        console.log('no funciona');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#caja_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        

    }else {
        console.log('funciona');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#caja_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }



}

function validarFormulario(formulario){

    const expresiones = {

        usuario_login: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        password_login: /^.{4,12}$/, // 4 a 12 digitos.
       
    
    }
    
    // capturamos los datos del formulario
    let formData = new FormData(formulario);
    
    for( i of formData.entries()) {
        console.log(`clave: ${i[0]}, valor: ${i[1]}`);
        
        switch (i[0]) {
            case 'usuario_login':
                validarCampo(expresiones.usuario_login,i[1],i[0]);
                break;
            case 'password_login':
                validarCampo(expresiones.password_login,i[1],i[0]);
                break;
           
        }
    
           
    }
}
function mostrarMensaje(campos){
   

    if(campos.usuario_login && campos.password_login) {
        console.log('es verdarero');
        document.getElementById('mensaje-error')
        .classList.remove('formulario-mensaje-error');
        document.getElementById('mensaje-exito')
        .classList.add('formulario-mensaje-exito');
		setTimeout(() => {
			document.getElementById('mensaje-exito')
            .classList.remove('formulario-mensaje-exito');
		}, 5000);

    } else {
        console.log('es falso');
        document.getElementById('mensaje-error')
        .classList.add('formulario-mensaje-error');
    
    }
}

formulario_login.addEventListener('submit',function(evento) {

    evento.preventDefault();
    validarFormulario(formulario_login);
    mostrarMensaje(campos);
    
    
});
    
    


