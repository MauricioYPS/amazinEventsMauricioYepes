import { urlApi } from "../modules/modules.js";

fetch(urlApi)
.then(Response => Response.json())
.then(data =>{
    let eventsAssist = data.events.filter(event => event.assistance)
    // console.log(eventsAssist);
    let eventPercentAssist = eventsAssist.map(event => {

        let percent = (event.assistance / event.capacity ) * 100
        return {
            ...event,
            percent: percent.toFixed(2)
        }
        

    })
    // console.log(eventPercentAssist);
    let porcentaje = eventPercentAssist.map(event => event.percent)
    // console.log(porcentaje);
    let mayorPorcentaje = Math.max(...porcentaje)
    // console.log(mayorPorcentaje);
    let menorPorcentaje = Math.min(...porcentaje)

    let eventoMayor = eventPercentAssist.filter(e => e.percent == mayorPorcentaje)
    // console.log(eventoMayor);

    let eventoMenor = eventPercentAssist.filter(e=> e.percent == menorPorcentaje)
    // console.log(eventoMenor);
    eventoMayor.forEach(element => {
        let contenedorMPorcentaje = document.getElementById("mayorPorcentaje")
        contenedorMPorcentaje.innerHTML = `
        ${element.name}:
        ${element.percent}%
        `
    });
    eventoMenor.forEach(element => {
        let contenedorMinPorcentaje = document.getElementById("menorPorcentaje")
        contenedorMinPorcentaje.innerHTML = `
        ${element.name}:
        ${element.percent}%
        `
    })

    let eventCapacitys = data.events
    // console.log(eventCapacitys);
    let eventLargerCapacity = eventCapacitys.map(event => (event.capacity) )
    // console.log(eventLargerCapacity);
    let capacityMayor = Math.max(...eventLargerCapacity)
    // console.log(capacityMayor);
    let capacityMayorName = eventCapacitys.filter(e => e.capacity == capacityMayor)
    // console.log(capacityMayorName);
    capacityMayorName.forEach(element=>{
        let conetenedorMayorCapacidad = document.getElementById("mayorCapacidad")

        conetenedorMayorCapacidad.innerHTML=`
        ${element.name}:
        ${element.capacity}
        `
    })


})

