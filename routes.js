const fs = require("fs");
const path = require("path");

module.exports = app => {

    // setup note variable
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);
        
        // api routes -----------------------

        // setup /api/notes get route
        app.get("/api/notes", (req, res) => {
            //read db.json file and return all saved notes as JSON file
            res.json(notes);
        });

        // setup api/notes post route
        app.post("/api/notes", (req, res) => {
            // receives new note, adds to to db.json then returns new note 
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // retrieve a note with specific id
        app.get("/api/notes/:id", (req, res) => {
            // display json for the notes array indices of the provided
            res.json(notes[req.params.id]);
        });

        // deletes a note with a specific id 
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log(`Deleted note with id ${req.params.id}`);
        });

        // view routes -------------------

        // display notes.html when /notes is accessed
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, ".\Develop\public\index.html"));
        });

        // display index.html when all other routes are accessed
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, ".\Develop\public\index.html"));
        });

        // updates the json file whenever a note is added or deleted
        const updateDb = () => {
            fs.writeFile("./Develop/db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}