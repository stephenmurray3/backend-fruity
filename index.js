// Importing Express
require('dotenv').config()
const express = require('express')
// Create our server by calling express
const app = express()
// Has to be above 1024
const port = process.env.PORT;

const fruits = require('./fruits.json');

// Middleware - code that is executed between the request coming in and the response being sent
// Authentification Middleware
// express.json
app.use(cors())
app.use(express.json())

// Create route - GET route
// [server].[method]('<path>', callback)
// req (request) / res (response)
app.get('/', (req, res) => {
    res.send('Hello, Fruit!')
})

// Route to return all the fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

// Route to return a specific fruit and its information
// :<property> -> dynamic parameter like in :name below
app.get('/fruits/:name', (req, res) => {
    console.log(req.params.name)
    // toLowerCase()
    const name = req.params.name.toLowerCase();
    // find()
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        res.status(404).send("The fruit doesn't exist.")
    } else {
        res.send(fruit)
    }
})

// app.get('/home', (req, res) => {
//   res.send('Hello World!') /* res.status(200).send('Hello World!') to send message and data OR res.sendStatus(200) to send just status */
// })

// Add a new piece of fruit to the data
const ids = fruits.map(fruit => fruit.id);
const maxId = Math.max(...ids);

app.post('/fruits', (req, res) => {
    const fruit = req.body
    // find()
    const found = fruits.find(item => item.name.toLowerCase() == fruit.name.toLowerCase())

    if (found) {
        res.status(409).send("The fruit already exists.")
    } else {
        res.status(201).send('The fruit has been added to the database.')
        maxId += 1;
        fruit.id = maxId;
        fruits.push(fruit)
        console.log(fruits)
    }


    console.log(req.body)

    res.send("New fruit created")
})

// Bind the server to a port
// app.listen(<port>, () => {})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})