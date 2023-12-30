const express = require('express')
const app = express()
const port = 3000

// Primer endpoint
app.get('/', (req, res) => {
  console.log(req)
  res.status(200).send('Hello world!')
})


// URLS
app.post('/team/pokemons', () => {
  res.status(200).send('Hello world!')
})

app.get('/team', () => {
  res.status(200).send('Hello world!')
})

app.delete('/team/pokemons/:pokeid', () => {
  res.status(200).send('Hello world!')
})

app.put('/team', () => {
  res.status(200).send('Hello world!')
})

app.listen(port, () => {
  console.log('Server started at port  localhost:3000/')
})
