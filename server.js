require("dotenv").config();
//Express
const express = require("express");
//Cors
const cors = require("cors");
//MongoDB
const { MongoClient } = require("mongodb");
const db_Url = process.env.DB_URL || "mongodb://127.0.0.1:27017";

const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());
app.use(cors());


const authorize = require("./authorize");
const userrouter = require('./routes/userRoutes')
const valutrouter = require('./routes/vaultRoutes')
app.use('/user',userrouter)
app.use('/vault',valutrouter)

app.get("/", authorize, async (req, res) => {
  try {
    let client = await MongoClient.connect(db_Url);
    let db = await client.db("pwdmanager");
    let data = await db.collection("masterpwd").find().toArray();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "no data found" });
    }
    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => console.log(`application runs with ${port}`));
