$(document).ready(function() {
    $('#emitir-boletos').click(function() {
        Swal.fire({
            title: 'Facturación Exitosa',
            text: 'Tus boletos han sido emitidos con éxito.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'btn btn-success'
            },
            buttonsStyling: false
        }).then(() => {
            // Redirection or additional logic can go here if needed
        });
    });

    $('#cancel').click(function() {
        Swal.fire({
            title: '¿Estás seguro de que deseas cancelar?',
            text: 'Los cambios no se guardarán.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../view/confirmacionreserva.html';
            }
        });
    });
});

