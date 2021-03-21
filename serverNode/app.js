const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "crudapp"
}) 

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelectAll = 
	"SELECT * FROM name";
	db.query(sqlSelectAll, (err, result) => {
        res.send(result);
	});
})

app.get("/api/get/:id", (req, res) => {
	const id = req.params.id;

    const sqlSelectOne = 
	"SELECT * FROM name WHERE id = ?";
	db.query(sqlSelectOne, id, (err, result) => {
        res.send(result);
	});
})

app.post("/api/insert", (req,res)=> {
    const lastName = req.body.lastName;
	const firstName = req.body.firstName;

	const sqlInsert = 
	"INSERT INTO name (lastName, firstName) VALUES (?, ?)";
	db.query(sqlInsert, [lastName, firstName], (err, result) => {
        console.log("Error : "+err)
	});
});

app.delete("/api/delete/:id", (req, res) => {
	const id = req.params.id

	const sqlDelete = 
	"DELETE FROM name WHERE id = ?";

	db.query(sqlDelete, id, (err, result) => {
		if(err) console.log(err)
	});
})

app.put("/api/update", (req, res) => {
	const id = req.body.id
	const lastName = req.body.lastName
	const firstName = req.body.firstName

	const sqlUpdate = 
	"UPDATE name SET lastName = ?, firstName = ? WHERE id = ?";
	
	db.query(sqlUpdate, [lastName, firstName, id], (err, result) => {
		if (err) console.log(err)
	});
})


app.listen(3001, ()=>{
    console.log('server is running at port 3001')
})
