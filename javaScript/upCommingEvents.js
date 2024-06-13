import { urlApi,crearTarjetas } from "../modules/modules.js"

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








