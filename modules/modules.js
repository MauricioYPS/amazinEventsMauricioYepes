export let pepe = "Prueba de modulo correcta"


// let arrayWeb = "https://aulamindhub.github.io/amazing-api/events.json"


// fetch(arrayWeb)
// .then(Response => Response.json())
// .then(data => {
//     console.log(data.events);

// })
// Definir selectedCategories y searchText
// Definir selectedCategories y searchText
// Definir selectedCategories y searchText
export let selectedCategories = [];
export let searchText = { value: '' };

// Función para crear tarjetas
export function crearTarjetas(tarjetaPadre, eventos, currentDate) {
    tarjetaPadre.innerHTML = '';
    if (eventos.length === 0) {
        tarjetaPadre.innerHTML = '<h2 class="txtt">There are no matches in your search</h2>';
        return;
    }
    for (let evento of eventos) {
        if (currentDate > new Date(evento.date)) {
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

// Función para aplicar filtros
export function aplicarFiltros(data, tarjetaPadre) {
    let eventosFiltrados = data.events.filter(function(evento) {
        let cumpleCategoria = selectedCategories.length === 0 || selectedCategories.includes(evento.category);
        let cumpleTexto = evento.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
                          evento.description.toLowerCase().includes(searchText.value.toLowerCase());
        return cumpleCategoria && cumpleTexto && (new Date(evento.date) <= new Date(data.currentDate));
    });

    crearTarjetas(tarjetaPadre, eventosFiltrados, new Date(data.currentDate));
}
