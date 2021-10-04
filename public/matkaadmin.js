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

function naitaLehte(leht) {
    const sisuElement = document.getElementById("sisu")
    if (leht == "matkad") {
        sisuElement.innerHTML = teeMatkadeHTML()
    } else if (leht == "lisaUudis") {
        sisuElement.innerHTML = teeLisaUudisHTML()
    }

}

function lisaUudis() {
    const pealkiri = document.getElementById("pealkiri").value
    const tekst = document.getElementById("uudisSisu").value
    let settings = {
        async: true,
        crossOrigin: true,
        url: `/api/lisauudis?pealkiri=${pealkiri}&sisu=${tekst}`
    }
    $.ajax(settings).done(function() {
        document.getElementById("lisaUudisVorm").innerHTML = `
        <div class="alert alert-success">
            Uudise lisamine õnnestus!
        </div>
        <button class="btn btn-link" onclick="naitaLehte('lisaUudis')">Lisa veel üks uudis</button>
        `
    })
    return false    
}

function teeLisaUudisHTML() {
return `
    <div class="row">
    <button class="btn btn-link" onclick="naitaLehte('matkad')">Matkade raport</button>
</div>

<div class="row">
    <form action="#" id="lisaUudisVorm">
        <div class="form-group">
            <label for="pealkiri">Pealkiri:</label>
            <input type="text" class="form-control" id="pealkiri" name="pealkiri">
        </div>
        <div class="form-group">
            <label for="sisu">Uudis:</label>
            <textarea class="form-control" name="sisu" id="uudisSisu" cols="30" rows="5"></textarea>
        </div>
        <button onclick="return lisaUudis()" class="btn btn-default">Lisa uudis</button>
    </form>
</div>    
    `
}

function teeMatkadeHTML() {
    return `
    <div class="row">
    <button class="btn btn-link" onclick="naitaLehte('lisaUudis')">Lisa uudis</button>
</div>

<div class="row">
    <div class="col-md-4" id="matkadeLoetelu">
        <ul>
            <li onclick="matkaAruanne(0)">Matk 1</li>
            <li onclick="matkaAruanne(1)">Matk 2</li>
            <li onclick="matkaAruanne(2)">Matk 3</li>
            <li onclick="matkaAruanne(3)">Matk 4</li>
        </ul>
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-3">Nimi</div>
            <div class="col-5">Email</div>
            <div class="col-4">Märkus</div>
        </div>
        <div id="osalejad"></div>
    </div>
</div>    
    `
}

naitaLehte("matkad")
matkadeLoetelu(0)