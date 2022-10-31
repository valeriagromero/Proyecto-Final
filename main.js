// Primero armos mis variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaServicios = document.querySelector('#lista-servicios');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; //Vacio para que agreguen los serv elegidos

// Eventos a utilizar

cargarEventListeners();

function cargarEventListeners() {

    listaServicios.addEventListener('click',agregarServicio);

    carrito.addEventListener('click', eliminarServicio);

    // vaciar carrito    

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Carrito Eliminado',
            showConfirmButton: false,
            timer: 1500
          })

        limpiarHTML ();
    });


}

// Mis funciones para armar carrito y los evenetos

function agregarServicio(e) {
    e.preventDefault();  //evitar el por defecto

    if(e.target.classList.contains('agregar-carrito')){
       const servicioSeleccionado = e.target.parentElement.parentElement;  
       leerDatosServicios(servicioSeleccionado);
    }

}

// Eliminar algun servicio (por su clase y su ID)

function eliminarServicio(e) {
    
    if(e.target.classList.contains('borrar-servicio')){         
        const servicioID = e.target.getAttribute('data-id');
        
        articulosCarrito.some(servicio=>{
 
            if(servicio.id === servicioID){
     
                if(servicio.cantidad>1){
                    servicio.cantidad--;
                }else{
                    articulosCarrito = articulosCarrito.filter( servicio => servicio.id !== servicioID);      

                }
            }
          })          
        
        carritoHTML();
    }
}

function leerDatosServicios(servicio) {

    // armo el objeto que quiero q aparezca en tabla

    const infoServicio = {
        imagen: servicio.querySelector('img').src,
        titulo: servicio.querySelector('h4').textContent,
        precio: servicio.querySelector('.precio span').textContent,
        id: servicio.querySelector('a').getAttribute('data-id'),
        cantidad: 1    
    }

// Ver si servicio ya esta en carrito  

const figura = articulosCarrito.some( servicio => servicio.id === infoServicio.id );
if (figura) {
    const servicios = articulosCarrito.map( servicio => {
        if( servicio.id === infoServicio.id) {
            servicio.cantidad++;  //suma los servicios (veer como hacer para tener boton que sume o reste)
            return servicio; 
        } else {
            return servicio;
        }
    }) 
       articulosCarrito = [...servicios];  
       
} else{articulosCarrito = [...articulosCarrito, infoServicio];} //Array

Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Agregado al carrito',
    showConfirmButton: false,
    timer: 1500
  })
            

    // console.log(articulosCarrito);    

    carritoHTML();
}

// Recorro el carrito y creo la tabla en DOM en el lugar que quiero que aparezca

function carritoHTML() {

    limpiarHTML();
    
    articulosCarrito.forEach( servicio => {
        const {imagen, titulo, precio, cantidad, id} = servicio;
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad} </td>
               
               <td>
                    <a href="#" class="borrar-servicio" data-id="${id}">X</a>
               </td>
          `;

      
    
              
          contenedorCarrito.appendChild(row);          
     
    })        
    sincronizarStorage();
}


// Armo funcion para limpiar HTML xq me suma vs veces 1 mismo servicio (Hijo - Padre)

function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)        
    }   
    
}

// Agrego LocalStorage

function sincronizarStorage() {
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
})

const otrosServiciosBtn = document.querySelector('#consultar');
otrosServiciosBtn.addEventListener('click', obtenerDatos);


function obtenerDatos() {
    fetch('data/otros.json') 
        .then( respuesta => {
            return respuesta.json()
        }) 
        .then(resultado => {
            mostrarHTML(resultado);
            console.log(resultado)
        })
}

function mostrarHTML(otros) {
    const contenido = document.querySelector('#contenido');

    let html = '';

    otros.forEach( otros => {
        const { id, nombre, precio, Pago} = otros;

        html += `
            <p>ID: ${id} </p>
            <p>Servicio: ${nombre} </p>           
            <p>Precio: ${precio} </p>
            <p>Pago: ${Pago} </p>
           

        `
    }); 


    contenido.innerHTML = html;    
}

