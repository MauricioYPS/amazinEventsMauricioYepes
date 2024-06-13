
const urlEventos = "https://aulamindhub.github.io/amazing-api/events.json"

let url = window.location.href

url = new URL(url).searchParams.get("id")
let contPDetails = document.getElementById('detailsDiv')
document.addEventListener('DOMContentLoaded', (e) => {
    fetch(urlEventos)
        .then(Response => Response.json())
        .then(data => {
            let tarjeta = data.events.filter(evento => evento._id == url)
            tarjeta.forEach(evento => {
                contPDetails.innerHTML = `
                            <div class="row g-0">
                    <img src="${evento.image}" class="img-fluid rounded-start object-fit-cover" alt="...">
                  </div>
                  <div id="descpD" class="col-sm-7">
                    <div class="card-body">
                      <h5 class="card-title">${evento.name}</h5>
                      <p class="card-subtitle">Date: ${evento.date} </p>
                      <p class="card-subtitle">description: ${evento.description}</p>
                      <p class="card-subtitle">Category: ${evento.category}</p>
                      <p class="card-subtitle">Place: ${evento.place}</p>
                      <p class="card-subtitle">Capacity: ${evento.capacity}</p>
                      <p class="card-subtitle">Estimate: ${evento.assistance || evento.estimate}</p>
                      <p class="card-subtitle">Price: ${evento.price}</p>
                    </div>
                  </div>
            `
            })

        })
})