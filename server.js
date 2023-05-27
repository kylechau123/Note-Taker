const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

const app = express();

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/api/notes", (req, res) => {

    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.post("/api/notes", (req, res) => {

    console.log(req.body)

    fs.readFile("./db/db.json", "utf-8" ,(err, data) => {
        console.log(data);

        const db = JSON.parse(data)

        console.log(db)

        db.push(req.body)

        console.log(db)

        fs.writeFile("./db/db.json", JSON.stringify(db, null, 4)  , (err, data) => {
            if(err) {
                console.log(err);
                res.status(500).end()
            } else {
                res.json({
                    message: "Note has been added!"
                })
            }
        })

    })
})

app.listen(PORT, () => {
    console.log("Server is running!")
})