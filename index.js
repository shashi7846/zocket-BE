const express = require("express");
const app = express();
const cors = require("cors");
const {MongoClient} =  require("mongodb");
 const ObjectID = require("mongodb").ObjectID;
const DB ="zockettask";
const URL="mongodb+srv://shashikanth:shashi7846@cluster0.vy1ca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const port = process.env.PORT|| 5000;

app.use(express.json());
app.use(cors())

const data=[];


app.post("/student", async function (req, res) {
    // req.body.id = students.length + 1;
    // students.push(req.body);
    // steps
    try {
      //1.connect to db server
  
      let connection = await MongoClient.connect(URL);
  
      //2.select the particular db
      let db = connection.db(DB);
  
      //3.do crud operation
      await db.collection("students").insertOne(req.body);
  
      //4. close the connection
      await connection.close();
      res.json({
        message: "Student Created",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(req.body)
  });


app.get("/",(req,res)=>res.status(200).send("hello mama"));

app.listen(port,()=>console.log(`Listining on the port ${port}`))



