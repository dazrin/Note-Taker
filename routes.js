const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = (app) => {
        
        // api routes -----------------------

        // function to read db.json
        const readDb = () => {
            const data = fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf8");
            return JSON.parse(data);
        }

        // function to write to db.json
        const writeDb = (notes) => {
            fs.writeFileSync(path.join(__dirname,"./db/db.json"),JSON.stringify(notes));
        }

        // setup /api/notes get route
        app.get("/api/notes", (req, res) => {
            //read db.json file and return all saved notes as JSON file
            res.json(readDb());
        });

        // setup api/notes post route
        app.post("/api/notes", (req, res) => {
            // receives new note, adds to to db.json then returns new note 
            const newNote = req.body;
            newNote.id = crypto.randomBytes(8).toString('hex');
            const notes = readDb();
            notes.push(newNote);
            writeDb(notes);
            res.json();
        });

        // deletes a note with a specific id 
        app.delete("/api/notes/:id", (req, res) => {
            const id = req.params.id;
            const notes = readDb();
            writeDb(notes.filter(note => note.id !== id));
            res.json();
        });

        // view routes -------------------

        // display notes.html when /notes is accessed
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/notes.html'));
        });

        // display index.html when all other routes are accessed
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, ".public/index.html"));
        });

    };
