$(document).ready(function () {
    $('.producto').click(function (e) {
        e.preventDefault();
        $(this).addClass('seleccionado');
    });

    $('.producto').dblclick(function (e) {
        e.preventDefault();
        $(this).removeClass('seleccionado');
    });
});