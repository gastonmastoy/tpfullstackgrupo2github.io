const formulario = document.getElementById('formulario');

// capturamos los datos del formulario

const expresiones = { //Expresiones Regulares:

    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,     // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,        // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/,                  // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/                  // 7 a 14 numeros.
}

//bandera formulario
const campos= {
    usuario: false,
	nombre: false,
	password: false,
    password2: false,
	correo: false,
	telefono: false,
    terminos: false
}

function validarCheck(input){
    if(input === 'on'){
        console.log('esta chequeado');
        campos['terminos'] = true;
    }else{
        console.log('no chequeado')
    }
}

function validarPassword2(campo){
    const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');
    if(inputPassword1.value != inputPassword2.value){
        console.log('no funciona');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#caja_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;

    }else{
        console.log('funciona');
        document.getElementById(`grupo__${campo}`)
        .classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`)
        .classList.add('formulario__grupo-correcto');
        document.querySelector(`#caja_${campo} .formulario__input-error`)
        .classList.remove('formulario__input-error-activo');
        campos[campo] = true;

    }
}

function validarCampo(expresion,input,campo) {
    if(input == '' || !expresion.test(input)){
        console.log('no funciona');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#caja_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;

    }else {
        console.log('funciona');
        document.getElementById(`grupo__${campo}`)
        .classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`)
        .classList.add('formulario__grupo-correcto');
        document.querySelector(`#caja_${campo} .formulario__input-error`)
        .classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }
}

function validarFormulario(formulario,expresiones){
    const formData = new FormData(formulario);
    for( i of formData.entries()) {
        console.log(`clave: ${i[0]}, valor: ${i[1]}`);
        
        switch (i[0]) {
            case "usuario":
                validarCampo(expresiones.usuario, i[1],i[0]);
                break;
            case "nombre":
                validarCampo(expresiones.nombre,i[1],i[0]);
                break;
            case "password":
                validarCampo(expresiones.password,i[1],i[0]);
                break;
            case 'password2':
                validarPassword2(i[0])
                break;
            case "correo":
                validarCampo(expresiones.correo,i[1],i[0]);
                break;
            case "telefono":
                validarCampo(expresiones.telefono,i[1],i[0]);
                break;
            case 'terminos':
                validarCheck(i[1]);
                break;
        }
    }
}

function mostrarMensaje(campos){
    if(campos.usuario && campos.password && campos.password2 && campos.nombre && campos.correo && campos.telefono && campos.terminos) {
        console.log('es verdarero');
        document.getElementById('mensaje-error')
        .classList.remove('formulario-mensaje-error');
        document.getElementById('mensaje-exito')
        .classList.add('formulario-mensaje-exito');
		
        setTimeout(() => {
            const formDataIter = new FormData(formulario);
            for( let clave of formDataIter.entries()){
                document.getElementById(`grupo__${clave[0]}`)
                .classList.remove('formulario__grupo-correcto');

            }
			document.getElementById('mensaje-exito')
            .classList.remove('formulario-mensaje-exito');
            formulario.reset();
		}, 5000);

    } else {
        console.log('es falso');
        document.getElementById('mensaje-error')
        .classList.add('formulario-mensaje-error');
    }
}

formulario.addEventListener('submit',function(evento) {
    evento.preventDefault();
    validarFormulario(formulario,expresiones,campos);
    console.log(campos);
    mostrarMensaje(campos);
});