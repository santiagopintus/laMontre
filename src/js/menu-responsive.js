$(() => {
    menuResponsive();
});

//Activamos el menu para que sea responsive
function menuResponsive() {
    $('.navbar-toggler').on('click', () => {
        $('.hamburguesa').toggleClass('abierto');
        $('.nav ul').slideToggle();
    })
    
    $(window).resize(function () { 
        if (window.innerWidth >= 768) {
            $('.nav ul').show()
        } else {
            $('.hamburguesa').removeClass('abierto');
            $('.nav ul').slideUp();
        }
    });
}