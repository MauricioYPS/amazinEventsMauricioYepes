import { urlApi } from "../modules/modules.js";

  let selectedCategories = [];
  let searchText = '';
  let tarjetaPadre = document.querySelector("#cardzz")
  let buscador = document.querySelector("#searchPE");
fetch(urlApi)
.then(Response => Response.json())
.then(data => {
crearTarjetas(tarjetaPadre, data.events)

function crearTarjetas(tarjetaPadre, eventos) {
  tarjetaPadre.innerHTML = '';
  if(eventos.length===0){
    tarjetaPadre.innerHTML = '<h2 class="txtt">There are no matches in your search</h2>'
    return;
  }
    for (let i = 0; i < eventos.length; i++) {
        let evento = eventos[i];
        if ( data.currentDate > data.events[i].date){
        let nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.classList.add("card");
        nuevaTarjeta.classList.add("m-3");
        nuevaTarjeta.classList.add("tarjetaImgs")
        nuevaTarjeta.style.width = "18rem";

        nuevaTarjeta.innerHTML = `<img src="${evento.image}" class="card-img-top" alt="...">
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
        </ul>`

        tarjetaPadre.appendChild(nuevaTarjeta);
    }
}
}
function aplicarFiltros() {
  let eventosFiltrados = data.events.filter(function(evento) {
      let cumpleCategoria = selectedCategories.length === 0 || selectedCategories.indexOf(evento.category) !== -1;
      let cumpleTexto = evento.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        evento.description.toLowerCase().includes(searchText.toLowerCase());
      return cumpleCategoria && cumpleTexto && (new Date(evento.date) <= new Date(data.currentDate));
  });

  crearTarjetas(tarjetaPadre, eventosFiltrados);
}


  const currentDate = new Date(data.currentDate)
      let divPapa = document.querySelector("#esternosPE")

    const eventosPE = data.events.filter(event => new Date(event.date) <= currentDate)

    const categoriasPE = []
    eventosPE.forEach(event =>{
      if (!categoriasPE.includes(event.category)) {
        categoriasPE.push(event.category);
      }
      
    })

    for (let i = 0; i < categoriasPE.length; i++) {

      let checkOrg = categoriasPE[i];
      let nuevoCheckBox = document.createElement("div");
      nuevoCheckBox.classList.add("navBg")
      nuevoCheckBox.classList.add("m-3")
      nuevoCheckBox.innerHTML = `
      <div>
          <input  type="checkbox" value="" id="flexCheck${i}">
          <label  for="flexCheck${i}">
              ${checkOrg}
          </label>
      </div>
      `
    divPapa.appendChild(nuevoCheckBox)
    let checkbox = document.querySelector(`#flexCheck${i}`);
    checkbox.addEventListener('change', function(event) {
        let category = categoriasPE[i];
        if (event.target.checked) {
            selectedCategories.push(category);
        } else {
            selectedCategories = selectedCategories.filter(function(cat) {
                return cat !== category;
            });
        }
        aplicarFiltros();
    });
  }
buscador.addEventListener('input', function(event) {
    searchText = event.target.value;
    aplicarFiltros();
});


})


  
  








