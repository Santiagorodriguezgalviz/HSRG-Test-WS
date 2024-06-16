document.getElementById('reservar-vuelo').addEventListener('click', function() {
    Swal.fire({
        title: '¿Deseas reservar este vuelo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, reservar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../view/confirmacionreserva.html';
        }
    });
});

document.getElementById('salir').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro de que deseas salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../view/busquedavuelos.html';
        }
    });
});

$(document).ready(function() {
    // Load filter options
    loadOptions('origen', 'http://localhost:9000/prueba/v1/api/enum/origen');
    loadOptions('destino', 'http://localhost:9000/prueba/v1/api/enum/destino');
    loadOptions('tipoCabina', 'http://localhost:9000/prueba/v1/api/enum/tipocabina');

    // Handle apply button click
    $('#aplicar').click(function() {
        var origen = $('#origen').val();
        var destino = $('#destino').val();
        var tipoCabina = $('#tipoCabina').val();
        var fechaSalida = $('#fechaSalida').val();
        var fechaRegreso = $('#fechaRegreso').val();

        // Construct the query parameters
        var queryParams = {
            origen: origen,
            destino: destino,
            tipoCabina: tipoCabina,
            fechaSalida: fechaSalida,
            fechaRegreso: fechaRegreso
        };

        // Fetch and display flight data
        fetchFlightData(queryParams);
    });
});

function loadOptions(elementId, url) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (response) {
            var html = '<option value="">Seleccionar</option>'; // Default option
            response.forEach(function (item) {
                html += `<option value="${item}">${item}</option>`;
            });
            $(`#${elementId}`).html(html);
        },
        error: function (error) {
            console.error("Error en la solicitud:", error);
        }
    });
}

function fetchFlightData(queryParams) {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/schedules/search",
        method: "GET",
        dataType: "json",
        data: queryParams,
        success: function (response) {
            var html = "";
            response.forEach(function (flight) {
                html += `<tr>
                    <td>${flight.origen}</td>
                    <td>${flight.destino}</td>
                    <td>${flight.fecha}</td>
                    <td>${flight.hora}</td>
                    <td>${flight.numeroVuelo}</td>
                    <td>${flight.precioCabina}</td>
                </tr>`;
            });
            $("#resultData").html(html);
        },
        error: function (error) {
            console.error("Error en la solicitud:", error);
        }
    });
}
