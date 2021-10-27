$(() => {
    main();
});

function main() {
    
    let form = $('#form');

    form.submit(handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);

    /* La url que está en el html que pertenece a la API de formspree */
    urlForm = event.target.action;

    infoPost = {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        },
    }
    if ($('#email').val() == '' || $('#mensaje').val() == '') {
        $('#formStatus').show();
        $('#formStatus').html("Todos los campos son obligatorios");
    } else {
        fetch(urlForm, infoPost)
        .then(response => {
            if (response.ok) {
                $('#formStatus').show();
                $('#formStatus').addClass('exito');
                $('#formStatus').html("Gracias por el mensaje!");
                form.reset();
            } else {
                $('#formStatus').show();
                $('#formStatus').addClass('error');
                $('#formStatus').html("Hubo un error en el envío.");
            }
        });
    }
    
    setTimeout(() => {
        $('#formStatus').hide()
    }, 5000);
}