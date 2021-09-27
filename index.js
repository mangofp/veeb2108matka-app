const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

const matk1 = {
  id: 0,
  nimetus: "Kevadmatk Kõrvemaal",
  kirjeldus: "Lähme ja kõnnime kolm päeva looduses",
  pildiUrl: '/pildid/matkaja.png',
  osalejad: []
}
const matk2 = {
  id: 1,
  nimetus: "Rattamatk Jõgevamaal",
  kirjeldus: "Väntame iga päev 30 kilomeetrit",
  pildiUrl: '/pildid/rattamatk.jpg',
  osalejad: []
}
const matk3 = {
  id: 2,
  nimetus: "Kepikõnnimatk ümber Tartu",
  kirjeldus: "14 kilomeetrine jalutuskäik",
  pildiUrl: '/pildid/matk_tartus1.jpg',
  osalejad: []
}
const matk4 = {
  id: 3,
  nimetus: "Kepikõnnimatk ümber Pühajärve",
  kirjeldus: "14 kilomeetrine jalutuskäik",
  pildiUrl: '/pildid/matk_tartus1.jpg',
  osalejad: []
}

const matkad = [matk1, matk2, matk3, matk4]

const uudised = [
  {
    id:0,
    pealkiri: "Uudis 1",
    tekst: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas dolore fugiat earum cum libero exercitationem fugit facere voluptatibus incidunt, illo iste eos. Facilis veritatis quos molestias dicta itaque rerum!"
  },
  {
    id:1,
    pealkiri: "Uudis 2",
    tekst: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas dolore fugiat earum cum libero exercitationem fugit facere voluptatibus incidunt, illo iste eos. Facilis veritatis quos molestias dicta itaque rerum!"
  },
  {
    id:3,
    pealkiri: "Uudis 3",
    tekst: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quas dolore fugiat earum cum libero exercitationem fugit facere voluptatibus incidunt, illo iste eos. Facilis veritatis quos molestias dicta itaque rerum!"
  }
]


function esileht(req, res) {
  return res.render("pages/index", {matkad})
}

function naitaRegistreerumist(req, res) {
  console.log("Matka number on: " + req.params.matk)
  console.log("Matka andmed on")
  const matk = req.params.matk
  console.log(matkad[matk])
  return res.render("pages/registreeru", {matk: matkad[matk]})
} 

function registreeriOsaleja(req, res) {
  const matk = matkad[req.params.indeks]
  matk.osalejad.push(req.query)
  console.log(matk)
  return res.send("Registreeruti")
}

function tagastaMatkalOsalejad(req, res) {
  const matk = matkad[req.params.indeks]
  return res.send(matk.osalejad)
}

function tagastaMatkadeAndmed(req, res) {
  return res.json(matkad.map((matk) => {
    return {
      indeks: matk.id,
      nimetus: matk.nimetus
    }
  } ))
}

express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/tervitus', (req, res) => res.end("Tervitused matkaklubist!"))
.get('/', esileht)
.get('/kontakt', (req, res) => res.render("pages/kontakt"))
.get('/uudised', (req, res) => res.render("pages/uudised", {uudised: uudised}))
.get('/registreeru/:matk', naitaRegistreerumist)
.get('/api/registreerimine/:indeks', registreeriOsaleja)
.get('/api/matkalosalejad/:indeks', tagastaMatkalOsalejad)
.get('/api/matkad', tagastaMatkadeAndmed)
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
