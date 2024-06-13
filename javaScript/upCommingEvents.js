import { urlApi } from "../modules/modules.js"

let tarjetaPadre = document.querySelector("#cardzz");
let divPapa = document.querySelector("#esternosUCE");
let buscador = document.querySelector("#searchUCE");
const categoriasUCE = [];

fetch(urlApi)
  .then(Response => Response.json())
  .then(data => {
    const currentDate = new Date(data.currentDate);
    const eventosUCE = data.events.filter(event => new Date(event.date) >= currentDate);
    eventosUCE.forEach(event => {
      if (!categoriasUCE.includes(event.category)) {
        categoriasUCE.push(event.category);
      }
    });

    for (let i = 0; i < categoriasUCE.length; i++) {
      let checkOrg = categoriasUCE[i];
      let nuevoCheckBox = document.createElement("div");
      nuevoCheckBox.classList.add("navBg");
      nuevoCheckBox.classList.add("m-3");
      nuevoCheckBox.innerHTML = `
  <div>
      <input type="checkbox" value="${checkOrg}" id="flexCheck${i}">
      <label for="flexCheck${i}">
          ${checkOrg}
      </label>
  </div>
  `;
      divPapa.appendChild(nuevoCheckBox);
    }

    function crearTarjetas(tarjetaPadre, eventos) {
      tarjetaPadre.innerHTML = '';
      if (eventos.length === 0) {

        tarjetaPadre.innerHTML = `
    <h2 class="txtt">There are no matches in your search</h2>'
    `
        return;
      }
      for (let i = 0; i < eventos.length; i++) {
        let evento = eventos[i];
        if (new Date(data.currentDate) < new Date(evento.date)) {
          let nuevaTarjeta = document.createElement("div");
          nuevaTarjeta.classList.add("card", "m-3", "tarjetaImgs");
          nuevaTarjeta.style.width = "18rem";

          nuevaTarjeta.innerHTML = `
      <img src="${evento.image}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">Price : ${evento.price}
              <div class="card-body marginLeftManual">
                  <a href="/details.html?id=${evento._id}" class="btn btn-secondary">Details</a>
              </div>
          </li>
      </ul>`;
          tarjetaPadre.appendChild(nuevaTarjeta);
        }
      }
    }

    function filtrarEventos() {
      let textoBusqueda = buscador.value.toLowerCase();
      let checkboxes = document.querySelectorAll('#esternosUCE input[type="checkbox"]');
      let categoriasSeleccionadas = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

      let eventosFiltrados = eventosUCE.filter(evento => {
        let cumpleBusqueda = evento.name.toLowerCase().includes(textoBusqueda) ||
          evento.description.toLowerCase().includes(textoBusqueda);
        let cumpleCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
        return cumpleBusqueda && cumpleCategoria;
      });

      crearTarjetas(tarjetaPadre, eventosFiltrados);
    }

    buscador.addEventListener('input', filtrarEventos);
    document.querySelectorAll('#esternosUCE input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', filtrarEventos);
    });

    crearTarjetas(tarjetaPadre, eventosUCE);

  })








