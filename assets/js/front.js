$(document).ready(function () {
    $('.producto').click(function (e) {
        e.preventDefault();
        $(this).addClass('seleccionado');
        var nombreProducto = $(this).data('nombre');
        $.post('/agregar-al-carrito', { nombre: nombreProducto }, function (data) {
        });
    });

    $('.producto').dblclick(function (e) {
        e.preventDefault();
        $(this).removeClass('seleccionado');
        var nombreProducto = $(this).data('nombre');
        $.post('/quitar-del-carrito', { nombre: nombreProducto }, function (data) {
        });
    });
});