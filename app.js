document.addEventListener('DOMContentLoaded', function(){

const email = {
    email: '',
    asunto: '',
    mensaje: ''
    
}
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const btnTostada = document.querySelector('#botones');
  

    // Eventos (validar)

    inputEmail.addEventListener('input', validar);

    inputAsunto.addEventListener('input', validar);

    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();             
        
    });    

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {

            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Crear Alerta

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent = 'Se Envio Con Exito';
            formulario.appendChild(alertaExito);          
                   
        }, 3000);    
          
    }

    btnTostada.addEventListener('click', () => {
        Toastify({
            text: "Gracias por su visita!",
            duration: 3000,
            gravity: 'bottom',
            position: 'center'
        }).showToast();
       })
 
    function validar(e) {
        if(e.target.value.trim() === ''){
            mostrarAlerta(`Ingrese el  ${e.target.id}  es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
           
            return;
        }

        limpiarAlerta(e.target.parentElement);


        //Asignar Valores

        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();

    }
   
    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        referencia.appendChild(error);
    } 

// DETECTAR CAMPOS VACIOS (USO TRIM)

     function limpiarAlerta(referencia) {

        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove(referencia);
        }
    }

    function validarEmail (email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
        }
    
    function comprobarEmail() {       

        if(Object.values(email).includes('')) {

            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return

        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        
    }

    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';


        formulario.reset();
        comprobarEmail();
    }    

});





            
