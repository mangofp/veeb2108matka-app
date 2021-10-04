const express = require('express')
const { MongoClient } = require("mongodb");

const path = require('path')
const PORT = process.env.PORT || 8000

const andmebaas = "matka-app-2108"
const uudisedCollection = "uudised"
const salasona = "hernesupp55"
const mongoUrl = `mongodb+srv://matka-app:${salasona}@cluster0.vpkdv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`
const client = new MongoClient(mongoUrl);

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

let uudised = [
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

async function registreeriOsaleja(req, res) {
  const matk = matkad[req.params.indeks]
  matk.osalejad.push(req.query)
  console.log(matk)

  try {
    await client.connect();
    const database = client.db(andmebaas);
    const registreerumised = database.collection("registreerumised");
    // create a document to insert
    const osaleja = req.query
    osaleja.matk = req.params.indeks
    const result = await registreerumised.insertOne(osaleja)
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }
  return res.send("Registreeruti")
}

async function tagastaMatkalOsalejad(req, res) {
  let result
  const matk = matkad[req.params.indeks]

  try {
    await client.connect();
    const database = client.db(andmebaas);
    const registreerumised = database.collection("registreerumised");
    const filter = { matk: req.params.indeks}
    
    result = await registreerumised.find(filter).toArray()
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }

  return res.send(result)
}

function tagastaMatkad(req, res) {
  return res.send(matkad)
}


function tagastaMatkadeAndmed(req, res) {
  return res.send(matkad.map((matk) => {
    return {
      indeks: matk.id,
      nimetus: matk.nimetus
    }
  } ))
}

async function lisaMatk(req, res) {
  const uusMatk = {
    id: matkad.length,
    nimetus: req.query.nimetus,
    kirjeldus: req.query.kirjeldus,
    pildiUrl: req.query.pildiUrl,
    osalejad: []
  }
  matkad.push(uusMatk)

  try {
    await client.connect();
    const database = client.db(andmebaas);
    const matkad = database.collection("matkad");
    const result = await matkad.insertOne(uusMatk)
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }
  return res.send(uusMatk)
}

async function lisaUudis(req, res) {
  const uusUudis = {
    id: uudised.length,
    pealkiri: req.query.pealkiri,
    tekst: req.query.sisu
  }
  uudised.push(uusUudis)
  try {
    await client.connect();
    const database = client.db(andmebaas)
    const uudisedMongo = database.collection("uudised")

    const result = await uudisedMongo.insertOne(uusUudis)
  } finally {
    await client.close();
  }
  res.send(uusUudis)
}

async function loeUudisedMallu() {
  try {
    await client.connect();
    const database = client.db(andmebaas);
    const uudisedMongo = database.collection("uudised");
    
    result = await uudisedMongo.find().toArray()
    uudised = result
  } finally {
    await client.close();
  }
}

loeUudisedMallu()

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
.get('/api/lisamatk', lisaMatk)
.get('/api/lisauudis', lisaUudis)
.get('/api/matkad', tagastaMatkad)
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
