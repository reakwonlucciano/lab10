//List of imports
const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

//Server listens out for requests from the client

//Gets the location of the build and static folder
//Build contains index.js and static contains css and javascript
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//No longer needed as we aren't using a domain of localhost: 3000 (Client End)
// const cors = require('cors');
// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('Books', bookSchema);

app.post('/api/books', (req, res) => {
  console.log(req.body);

  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })

  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
  bookModel.find((error, data) => {
    res.json(data);
  })
})

app.get('/api/book/:id', (req, res) => {
  console.log(req.params.id);
  bookModel.findById(req.params.id, (error, data) => {
    res.json(data);
  })
})

//Listens for request coming in with a put method, finds a book with a certain id and updates the book
app.put('/api/book/:id', (req, res) => {

  console.log('Update: ' + req.params.id)
  console.log(req.body);

  //Find a book by id and send back some data
  bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
    (error, data) => {
      res.send(data);
    })
})

//Listens for request coming in with a delete method with an endpoint passed in as a parameter
app.delete('/api/book/:id', (req, res) => {
  console.log('Deleting: ' + req.params.id); //Log to console saying deleting a certain book id

  //Go to database, find matching id and delete it
  bookModel.findByIdAndDelete({ _id: req.params.id }, (error, data) => { //passes in the id in the url and the callback function that executes after asynchronous operation
    res.send(data); //Sends back the data  
  })

})

// Handles any urls that don't match the ones above
//Sends back a file called index.html thats in the current directory 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});


//Listens in on a given port for incoming requests 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
