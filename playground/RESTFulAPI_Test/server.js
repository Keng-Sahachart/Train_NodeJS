const express = require('express');
const app = express();

const books = require('./db');

const bodyParser = require('body-parser');  // Middleware  เอาไว้อ่าน ค่า json 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id));
});


app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).json(req.body);
});

// app.put('/books/:id',(req,res)=>{
//     const updateIndex = books.findIndex(book.id === req.params.id);
//     res.json(Object.assign(books[updateIndex],req.body));
// } );

app.put('/books/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    res.send("xxxx");
    res.json(books);

    // const updateIndex = books.find(book => book.id === req.params.id)
    // res.json(Object.assign(books[updateIndex], req.body))
})

app.get('/', (req, res) => {
    res.send('Hello World.');
});

app.listen(3001, () => {
    console.log('Start server at port 3001.')
});