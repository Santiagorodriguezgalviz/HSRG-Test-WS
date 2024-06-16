document.getElementById('buscar-vuelos').addEventListener('click', function() {
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const tipoCabina = document.getElementById('tipo-cabina').value;
    const tipoViaje = document.querySelector('input[name="tipo-viaje"]:checked').value;
    const fechaSalida = document.getElementById('fecha-salida').value;
    const fechaRegreso = document.getElementById('fecha-regreso').value;
    const flexibleDates = document.getElementById('salida-checkbox').checked;

    const url = new URL('http://localhost:9000/prueba/v1/api/schedules/search');
    const params = {
        departureAirportId: origen,
        destinationAirportId: destino,
        departureDate: fechaSalida,
        returnDate: tipoViaje === 'retorno' ? fechaRegreso : '',
        flexibleDates: flexibleDates,
        cabinType: tipoCabina
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data, tipoViaje);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function displayResults(data, tipoViaje) {
    const salidaResults = document.getElementById('salida-results');
    const regresoResults = document.getElementById('regreso-results');

    salidaResults.innerHTML = '';
    regresoResults.innerHTML = '';

    const salidaVuelos = data.filter(flight => flight.route.departureAirport.id === 'CAI');
    const regresoVuelos = data.filter(flight => flight.route.departureAirport.id === 'AUH');

    salidaVuelos.forEach(flight => {
        const flightElement = document.createElement('tr');
        flightElement.innerHTML = `
            <td>${flight.route.departureAirport.name}</td>
            <td>${flight.route.destinationAirport.name}</td>
            <td>${flight.date.split('T')[0]}</td>
            <td>${flight.date.split('T')[1]}</td>
            <td>${flight.id}</td>
            <td>${flight.price}</td>
        `;
        salidaResults.appendChild(flightElement);
    });

    if (tipoViaje === 'retorno') {
        regresoVuelos.forEach(flight => {
            const flightElement = document.createElement('tr');
            flightElement.innerHTML = `
                <td>${flight.route.departureAirport.name}</td>
                <td>${flight.route.destinationAirport.name}</td>
                <td>${flight.date.split('T')[0]}</td>
                <td>${flight.date.split('T')[1]}</td>
                <td>${flight.id}</td>
                <td>${flight.price}</td>
            `;
            regresoResults.appendChild(flightElement);
        });
    }
}

document.getElementById('reservar-vuelo').addEventListener('click', function() {
    window.location.href = '../view/confirmacionreserva.html';
});

document.getElementById('salir').addEventListener('click', function() {
    const confirmReservation = document.getElementById('confirm-reservation');
    confirmReservation.classList.remove('visible');
});
