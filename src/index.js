/**
 * A simple express app to connect to a MongoDB 
 * in just 3 steps !
 *
 * STEP 1
 * install docker from www.docker.com and once installed, run this on your command line:
 * docker run --name mongo-00 -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
 *
 * connection string being: mongodb://mongoadmin:secret@localhost:27017
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
 * Do you want to know more? https://github.com/bezkoder/node-express-mongodb
 * To manage users and roles in mongodb: https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/
 */

const express = require("express");
// const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

const dbName = 'AbriTest' // if the database doesn't exists, then it will be created
// mongoose.Promise = global.Promise; // is this really needed?
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // to connecto to "admin" db you need to login with below user + pass
    // user: 'mongoadmin',
    // pass: 'secret',
}).then(() => {
    console.log(`successfully connected to database ${dbName}`);
}).catch(err => {
    console.log(`error connecting to database ${dbName}`);
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
