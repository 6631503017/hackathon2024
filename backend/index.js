const express = require('express')
const prisma = require('./prisma')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/hello', function (req, res) {
    res.send('se')
})

app.get('/users', async (req, res) => {
    try {
        const data = await prisma.user.findMany()
        res.send(data)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        const data = await prisma.user.create({data: req.body})
        res.status(201).send(data)
    } catch(error) {
        console.error("Create user error", error.message)
        res.status(500).send(error.message)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const data = await prisma.user.findFirst({ where: {id: req.params.id}})
        res.status(201).send(data)
    } catch(error) {
        console.error("Create user error", error.message)
        res.status(500).send(error.message)
    }
})

app.listen(8080, async () => {
    const data = await prisma.user.findMany()
    console.log(data);
    
})