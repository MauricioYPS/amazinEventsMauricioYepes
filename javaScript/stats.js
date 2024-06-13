import { urlApi } from "../modules/modules.js";

fetch(urlApi)
.then(Response => Response.json())
.then(data =>{
    let eventsAssist = data.events.filter(event => event.assistance)
    let eventPercentAssist = eventsAssist.map(event => {

        let percent = (event.assistance / event.capacity ) * 100
        return {
            ...event,
            percent: percent.toFixed(2)
        }
        

    })
    let porcentaje = eventPercentAssist.map(event => event.percent)
    let mayorPorcentaje = Math.max(...porcentaje)
    let menorPorcentaje = Math.min(...porcentaje)

    let eventoMayor = eventPercentAssist.filter(e => e.percent == mayorPorcentaje)

    let eventoMenor = eventPercentAssist.filter(e=> e.percent == menorPorcentaje)
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
    let eventLargerCapacity = eventCapacitys.map(event => (event.capacity) )
    let capacityMayor = Math.max(...eventLargerCapacity)
    let capacityMayorName = eventCapacitys.filter(e => e.capacity == capacityMayor)
    capacityMayorName.forEach(element=>{
        let conetenedorMayorCapacidad = document.getElementById("mayorCapacidad")

        conetenedorMayorCapacidad.innerHTML=`
        ${element.name}:
        ${element.capacity}
        `
    })



    const currentDate = new Date(data.currentDate);
    const upcomingEvents = data.events.filter(event => new Date(event.date) >= currentDate);

    const categories = {};

    upcomingEvents.forEach(event => {
      const category = event.category;
      if (!categories[category]) {
        categories[category] = {
          totalRevenue: 0,
          totalCapacity: 0,
          totalAssistance: 0,
          eventCount: 0
        };
      }

      categories[category].totalRevenue += event.price * event.capacity;
      categories[category].totalCapacity += event.capacity;
      categories[category].totalAssistance += event.assistance || event.estimate || 0;
      categories[category].eventCount += 1;
    });

    const result = Object.keys(categories).map(category => {
      const { totalRevenue, totalCapacity, totalAssistance } = categories[category];
      const attendancePercentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);
      return {
        category,
        totalRevenue,
        attendancePercentage
      };
    });

    const tbody = document.getElementById('eventData');

    result.forEach((item, index) => {
      if (index < tbody.rows.length) {
        tbody.rows[index].cells[0].textContent = item.category;
        tbody.rows[index].cells[1].textContent = item.totalRevenue;
        tbody.rows[index].cells[2].textContent = item.attendancePercentage + '%';
      } else {
        const newRow = tbody.insertRow();
        newRow.insertCell(0).textContent = item.category;
        newRow.insertCell(1).textContent = item.totalRevenue;
        newRow.insertCell(2).textContent = item.attendancePercentage + '%';
      }
    });


const pastEvents = data.events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
});


const eventsByCategory = {};
pastEvents.forEach(event => {
    if (!eventsByCategory[event.category]) {
        eventsByCategory[event.category] = [];
    }
    eventsByCategory[event.category].push(event);
});

const categoryStats = {};
Object.keys(eventsByCategory).forEach(category => {
    const events = eventsByCategory[category];
    const totalRevenue = events.reduce((total, event) => total + event.price * event.assistance, 0);
    const totalCapacity = events.reduce((total, event) => total + event.capacity, 0);
    const totalAssistance = events.reduce((total, event) => total + event.assistance, 0);
    const averageAttendance = (totalAssistance / events.length).toFixed(2);
    const attendancePercentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);

    categoryStats[category] = {
        totalRevenue,
        averageAttendance,
        attendancePercentage
    };
});

console.log("Estadísticas por categoría:");
console.log(categoryStats);


})

