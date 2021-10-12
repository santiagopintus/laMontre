$(() => {
    menuResponsive();
});

//Activamos el menu para que sea responsive
function menuResponsive() {
    $('.navbar-toggler').on('click', () => {
        $('.nav ul').slideToggle(400, () => {
            $('.hamburguesa').toggleClass('abierto');
        });

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