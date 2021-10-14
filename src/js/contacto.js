$(() => {
    main();
});

function main() {
    
    var form = document.getElementById("form");

    form.addEventListener("submit", handleSubmit)
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
    
    fetch(urlForm, infoPost)
        .then(response => {
            $('#formStatus').show();
            $('#formStatus').addClass('exito');
            $('#formStatus').html("Gracias por el mensaje!");
            form.reset();
        })
        .catch(error => {
            $('#formStatus').show();
            $('#formStatus').addClass('error');
            $('#formStatus').html("Hubo un error enviando el mensaje");
        });
    setTimeout(() => {
        $('#formStatus').hide()
    }, 5000);
}