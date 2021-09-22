
function looMatkaHtml(matk) {
    return `
    <div class="col-md-4 card">
        <img class="card-img-top" src="${matk.pildiUrl}" alt="">
        <div class="card-body">
            <h4 class="card-title" >${matk.nimetus}</h4>
            <p>
                ${matk.kirjeldus}
            </p>
            <a href="/registreeru/${matk.id}" class="btn btn-primary">Registreeru</a>
        </div>
    </div>    
    `
}