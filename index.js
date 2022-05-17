const express = require('express')
const productosRouter = require('./routes/productos.router')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use('/uploads', express.static(__dirname + '/uploads'))

const publicPath = `${__dirname}/public`
app.use('/static', express.static(publicPath))

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  return next()
})

app.get('/', (req, res) => {
  return res.json({
    status: 'ok'
  })
})

app.use('/api/productos', productosRouter)

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error de servidor: ${error}`))