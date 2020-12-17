// get dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const readDB = () => {
    try {
        const notes = JSON.parse(fs.readFileSync(path.join('./', 'db/db.js'), {encoding: 'utf8'}));
        return notes;
    } catch(err) {
        console.error(err);
    }
}

const saveDB = (notes) => {
    try {
        fs.writeFileSync(path.join('./', 'db/db.json'), JSON.stringify(notes));
        return true;
    } catch(err) {
        console.error(err);
    }
    return false;
    }


// create server 
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require routes file
require('./routes')(app);

// Setup listener
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});  