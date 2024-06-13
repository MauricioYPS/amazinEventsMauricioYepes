//empezamos por 4ta vez
export const urlApi = "https://aulamindhub.github.io/amazing-api/events.json"

export function aplicarFiltros(array,arrayCategories,textsearch,tarjetaPadre) {
    let eventosFiltrados = array.filter(function(evento) {
      let cumpleCategoria = arrayCategories.length === 0 || arrayCategories.indexOf(evento.category) !== -1;
      let cumpleTexto = evento.name.toLowerCase().includes(textsearch.toLowerCase()) ||
                        evento.description.toLowerCase().includes(textsearch.toLowerCase());
      return cumpleCategoria && cumpleTexto;
    });
  
    crearTarjetas(tarjetaPadre, eventosFiltrados);
  }
  export function crearTarjetas(tarjetaPadre, eventos) {
    tarjetaPadre.innerHTML = '';
    if (eventos.length === 0){
      tarjetaPadre.innerHTML = '<h2 class="txtt">There are no matches in your search</h2>'
      return;
    }
    for (let i = 0; i < eventos.length; i++) {
      let evento = eventos[i];
  
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


