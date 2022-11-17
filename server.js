const express = require('express')
const morgan = require('morgan')
const app = express()

let products = [
    {
        id:1,
        name:'laptop',
        price:3000
    }
]

app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req, res)=>{
    res.json(products)
})

app.post('/products', (req, res)=>{  //crea
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

app.put('/products/:id', (req, res)=>{

    const newData = req.body
    const productFound = products.find(
        (product)=> product.id === parseInt(req.params.id)
    )

    if(!productFound){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    products = products.map(p=> p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.json({
        message: "Producto actualizado correctamente."
    })
})

app.delete('/products/:id', (req, res)=>{
    //Primero verifico que el producto exista.
    const productFound = products.find(
        (product)=> product.id === parseInt(req.params.id)
    )

    if(!productFound){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    //con el metodo filter lo elimino.

    products = products.filter(p => p.id !== parseInt(req.params.id)) //Me saca el id que ingrese yo

    res.sendStatus(204)
})

app.get('/products/:id', (req, res)=>{
    const productFound = products.find(
        (product)=> product.id === parseInt(req.params.id)
    )

    if(!productFound){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    res.json(productFound)
})

app.listen(3000)
console.log('Server on port 3000')