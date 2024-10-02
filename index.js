const express = require('express') // demande le framework express
const router = express.Router() // créer une nouvel objet routeur à partir du framework express 

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => { // méthode pour obtenir les users --> le nom de la page 
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => { // informations 
  res.send('About birds')
})

module.exports = router