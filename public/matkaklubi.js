
function looMatkaHtml(matk) {
    return `
    <div class="col-md-4 card">
        <img class="card-img-top" src="${matk.pildiUrl}" alt="">
        <div class="card-body">
            <h4 class="card-title" >${matk.nimetus}</h4>
            <p>
                ${matk.kirjeldus}
            </p>
            <a href="#" class="btn btn-primary">Registreeru</a>
        </div>
    </div>    
    `
}

const matk1 = {
    nimetus: "Kevadmatk Kõrvemaal",
    kirjeldus: "Lähme ja kõnnime kolm päeva looduses",
    pildiUrl: './pildid/matkaja.png'
}
const matk2 = {
    nimetus: "Rattamatk Jõgevamaal",
    kirjeldus: "Väntame iga päev 30 kilomeetrit",
    pildiUrl: './pildid/rattamatk.jpg'
}
const matk3 = {
    nimetus: "Kepikõnnimatk ümber Tartu",
    kirjeldus: "14 kilomeetrine jalutuskäik",
    pildiUrl: './pildid/matk_tartus1.jpg'
}

const matkad = [matk1, matk2, matk3]
document.getElementById('matkad').innerHTML = ''
for (const matk of matkad) {
    document.getElementById('matkad').innerHTML += looMatkaHtml(matk)
    
}