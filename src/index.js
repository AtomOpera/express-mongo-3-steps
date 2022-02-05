/**
 * A simple express app to connect to a MongoDB 
 * in just 3 steps !
 *
 * STEP 1
 * install docker from www.docker.com and once installed, run this on your command line:
 * docker run --name mongo-00 -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
 *
 * STEP 2
 * go to the folder were you have downloaded this code and run this on your command line:
 * yarn
 * 
 * STEP 2
 * in the same folder just run:
 * yarn start
 * 
 * Good luck have fun!
 * Do you want to know more? // https://github.com/bezkoder/node-express-mongodb
 */

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    user: 'mongoadmin',
    pass: 'secret',
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});

app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/json", (req, res) => {
  res.json({ 
    message: "Welcome to bezkoder application.",
    try: "adding index to the URL above",
  });
});

app.get('/index', function(req,res) {
  // { root: '.' } will set you one folder up
  res.sendFile('index.html', { root: '.' });
});

app.get('/', function(req,res) {
  // { root: '.' } will set you one folder up
  res.sendFile('index.html', { root: '.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
