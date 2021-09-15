const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function esileht(req, res) {
  return res.render("pages/index")
}

express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/tervitus', (req, res) => res.end("Tervitused matkaklubist!"))
.get('/', esileht)
.get('/kontakt', (req, res) => res.render("pages/kontakt"))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
