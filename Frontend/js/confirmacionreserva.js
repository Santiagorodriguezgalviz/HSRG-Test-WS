$(document).ready(function() {
    $('#salir').click(function() {
        Swal.fire({
            title: '¿Estás seguro de que deseas salir?',
            text: 'Los cambios no se guardarán.',
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

    $('#reservar-vuelo').click(function() {
        Swal.fire({
            title: 'Vuelo Reservado con Éxito',
            text: 'Tu vuelo ha sido reservado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = '../view/confirmacionfactura.html';
        });
    });
});
