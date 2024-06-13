// import { llenarDetalles, urlApi } from "../modules/modules.js";


// document.addEventListener("DOMContentLoaded", function () {
//   fetch(urlApi)
//     .then(Response => Response.json())
//     .then(data => {
//       console.log(data.events);
//       let urlParams = new URLSearchParams(window.location.search);
//       let eventId = urlParams.get('id');
//   console.log(eventId);
//       if (eventId) {
//         const event = data.events.find(e => e._id === eventId);
//         console.log("si cumple");
//         console.log(event);
//           llenarDetalles(event);
        
//       }


//     })

// });

//consumo de datos API
const urlEventos = "https://aulamindhub.github.io/amazing-api/events.json"

//url de la pagina actual
let url = window.location.href

//valor del value de la direccion
url = new URL(url).searchParams.get("id")
console.log(url);

let contPDetails = document.getElementById('detailsDiv')
document.addEventListener('DOMContentLoaded', (e) => {
    fetch(urlEventos)
        .then(Response => Response.json())
        .then(data => {
            let tarjeta = data.events.filter(evento => evento._id == url)
            console.log(tarjeta);
            tarjeta.forEach(evento => {
                contPDetails.innerHTML = `
             <div class="row g-0 d-flex justify-content-evenly container_h_details my-5">
             <div class="col-6 -md-4 cont_n_1_details h-100">
             <img src = "${evento.image}" alt="Museum">
             </div>
             <div class="bg-white -md-8 cont_n_2_details">
             <div class="card-body d-flex flex-column justify-content-center align-items-start w-100 h-100">
             <h3 class="card-title mb-2">${evento.name}</h3>
             <p class="card-text mb-1" id="descripcion">${evento.description}</ p>
             <p class="card-text mb-1"><span class="span">Category: </span> ${evento.category}</p>
             <p class="card-text mb-1"><span class="span">Place: </span> ${evento.place}</p>
             <p class="card-text mb-1"><span class="span">Date: </span> ${evento.date < data.currentDate ? 'This event has already happened' : 'This event is coming'}</p>
             <p class="card-text mb-1"><span class="span">Capacity: </span> ${evento.capacity} People</p>
             <p class="card-text mb-1">${evento.date < data.currentDate ?` <span class="span">Asistance: </span> `:` <span class="span">Estimate:</span>`} ${evento.assistance || evento.estimate} People</p>
             <p class="card-text mb-1"><span class="span">Price: </span>${evento.price} $</p>
             </div>
             </div>
             </div>
             `
            })

        })
})