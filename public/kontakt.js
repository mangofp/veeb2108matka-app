function saadaVorm() {
    const nimi = document.getElementById('nimi')
    const andmed = {
        nimi: document.getElementById('nimi').value,
        email: document.getElementById('email').value,
        markus: document.getElementById('markus').value
    }
    console.log('Vormi andmed')
    console.log(andmed)
    return false
}

function registreeri() {
    const andmed = {
        nimi: document.getElementById('nimi').value,
        email: document.getElementById('email').value,
        markus: document.getElementById('markus').value,
        id: document.getElementById('indeks').value,

    }
    console.log('Registreerumise andmed')
    console.log(andmed)
    let settings = {
        async: true,
        crossOrigin: true,
        url: `/api/registreerimine/${andmed.id}?nimi=${andmed.nimi}&email=${andmed.email}&markus=${andmed.markus}}`
    }
    $.ajax(settings).done(function() {
        document.getElementById("registreerumisVorm").innerHTML = "Registreerumine õnnestus!"
    })
    return false
}