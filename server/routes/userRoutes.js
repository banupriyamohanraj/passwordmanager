require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { MongoClient } = require("mongodb");
const db_Url = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const router = express();
router.use(express.json());
router.use(cors());


router.post("/signup", async (req, res) => {
  try {
    let client = await MongoClient.connect(db_Url);
    let db = await client.db("pwdmanager");
    let registeredUser = await db.collection("masterpwd").findOne({ email: req.body.email, password: req.body.password });
    if (!registeredUser) {
      let salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);
      let newUser = await db
        .collection("masterpwd")
        .insertOne({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          vault:req.body.vault
        });
      res.json({ newUser, message: "user created successfully" });
    } else {
      res.json({ message: "User already registered" });
    }
  } catch (error) {}
});

router.post("/login", async (req, res) => {
    try {
        let client = await MongoClient.connect(db_Url);
        let db = await client.db('pwdmanager');
        let user = await db.collection("masterpwd").findOne({ email: req.body.email})
        if (user) {
            let isValid = await bcrypt.compare(req.body.password, user.password)
            if (isValid) {
                let token = await jwt.sign({user_id:user._id},process.env.JWT_KEY)
                res.status(200).json({ message: "Login Sucessfull" ,token,user})
            }
            else {
                res.status(401).json({ message: "Invalid Credentials" })
            }
        }
        else {
            res.status(404).json({ message: "User not registered" })
        }
        client.close();
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})


module.exports = router;
