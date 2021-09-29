let matkadeAndmed = []

function teeOsalejaHtml(osaleja) {
    return `
    <div class="row">
        <div class="col-3">${osaleja.nimi}</div>
        <div class="col-5">${osaleja.email}</div>
        <div class="col-4">${osaleja.markus}</div>
    </div>    
    `
}


function matkaAruanne(indeks) {
    let settings = {
        async: true,
        crossOrigin: true,
        url: `/api/matkalosalejad/${indeks}`,
        headers: {}
    }
    $.ajax(settings).done(function(tagastatudAndmed) {
        console.log(tagastatudAndmed)
        let osalejadHtml = ""

        for (const osaleja of tagastatudAndmed) {
            osalejadHtml += teeOsalejaHtml(osaleja)
        }

        document.getElementById("osalejad").innerHTML = osalejadHtml
        naitaMatkad(indeks)

    })
}

function naitaMatkad(indeks) {
    let matkadHTML = ""
    for (const matk of matkadeAndmed) {
        matkadHTML += `
        <li class="matkaValik" onclick=matkaAruanne(${matk.id})>${matk.nimetus}</li>
        `
    }

    document.getElementById('matkadeLoetelu').innerHTML = `
    <ul>
        ${matkadHTML}
    </ul>
    `
}

function matkadeLoetelu(indeks) {
    let settings = {
        async: true,
        crossOrigin: true,
        url: `/api/matkad`,
        headers: {}
    }
    $.ajax(settings).done(function(tagastatudAndmed) {
        console.log(tagastatudAndmed)
        matkadeAndmed = tagastatudAndmed
        naitaMatkad(indeks)
    })
}

matkadeLoetelu(0)