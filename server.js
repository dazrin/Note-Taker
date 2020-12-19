// get dependencies
const express = require("express");

// create server 
const app = express();
const PORT = process.env.PORT || 3000;

// setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// give access to the files in public folder
app.use(express.static("public"));

//Require routes file
require('./routes')(app);

// Setup listener
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});  