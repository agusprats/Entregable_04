const express = require('express')
const { Router } = express
const productosRouter = Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb (null, `${Date.now()}.png-${file.fieldname}`)
  }
})

const upload = multer({ storage })
const productos = [ 
    {
      title: 'Title 1',
      price: 67,
      thumbnail: 'algo.png'
    },
    {
      title: 'Title 2',
      price: 67,
      thumbnail: 'algomas.png'
    }
]

productosRouter.get('',  (req, res, next) => {
  if(!productos){
    return res.status(400).json({ 
      error: 'No existen productos'
    })
  }
  res.json(productos);
})

productosRouter.post('/uploadFile', upload.single('thumbnail'), (req, res) => {
  const file = req.file
  if(!file){
    return res.status(400).json({ 
      error: 'Subir archivo'
    })
  }
  return res.json(file)
})

productosRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const producto = productos.find(producto => producto.id === Number(id))
  if(!producto.id){
    return res.status(400).json({ 
      error: 'No existe el producto'
    })
  }
  return res.json(producto)
})

productosRouter.post('', (req, res) => {
  const newProducto = req.body
  newProducto.id = productos.length + 1
  productos.push(newProducto)
  return res.status(201).json(newProducto)
})

productosRouter.delete(':id', (req, res) => {
  console.log(`DELETE Request recibido con parámetros: ${JSON.stringify(req.params, null, 2)}`)
  const { id } = req.params
  const producto = productos.find(producto => producto.id === Number(id))
  return res.json(producto)
})

productosRouter.put(':id', (req, res) => {
  console.log(`PUT Request recibido con body: ${JSON.stringify(req.body, null, 2)}`)
  const { id } = req.params
  const message = messages.find(message => message.id === Number(id))
  return res.json({ message, new: req.body })
})

module.exports = productosRouter
