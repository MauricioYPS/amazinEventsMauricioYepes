import { aplicarFiltros, crearTarjetas, urlApi } from "../modules/modules.js";

fetch(urlApi)
  .then(responsive => responsive.json())
  .then(data => {
    let tarjetaPadre = document.querySelector("#cardzz")

    crearTarjetas(tarjetaPadre, data.events)



    let selectedCategories = [];
    let searchText = '';



    let divPapa = document.querySelector("#esternos");
    let categories = data.events.map(function (event) { return event.category; })
      .filter(function (category, i, map) { return map.indexOf(category) === i; });

    for (let i = 0; i < categories.length; i++) {
      let checkOrg = categories[i];
      let nuevoCheckBox = document.createElement("div");
      nuevoCheckBox.classList.add("navBg", "m-3");
      nuevoCheckBox.innerHTML = `
    <div>
      <input type="checkbox" value="${checkOrg}" id="flexCheck${i}">
      <label for="flexCheck${i}">
        ${checkOrg}
      </label>
    </div>`;
      divPapa.appendChild(nuevoCheckBox);

      let checkbox = document.querySelector(`#flexCheck${i}`);
      checkbox.addEventListener('change', function (event) {
        let category = categories[i];
        if (event.target.checked) {
          selectedCategories.push(category);
        } else {
          selectedCategories = selectedCategories.filter(function (cat) {
            return cat !== category;
          });
        }
        aplicarFiltros(data.events,selectedCategories,searchText,tarjetaPadre);
      });
    }

    let buscador = document.querySelector("#search");
    buscador.addEventListener('input', function (event) {
      searchText = event.target.value;
      aplicarFiltros(data.events,selectedCategories,searchText,tarjetaPadre);
    });


  })












