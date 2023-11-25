require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient,ObjectId } = require("mongodb");
const db_Url = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const router = express();
router.use(express.json());
router.use(cors());


router.get("/:id", async (req, res) => {
    try {
        let client = await MongoClient.connect(db_Url);
        let db = await client.db('pwdmanager');
        let user = await db.collection("masterpwd").findOne({ _id : ObjectId(req.params.id) })
        if (user) {
               
                res.json({user, message: "vault data of user retrieved sucessfully" })
            }
            else {
                res.status(401).json({ message: "no vault data" })
            }
       
        client.close();
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/add/:id", async (req, res) => {
  try {
    let client = await MongoClient.connect(db_Url);
    let db = await client.db("pwdmanager");
    let user = await db.collection("masterpwd").findOne({ _id : ObjectId(req.params.id) })
    if (user) {
      
     
      let newUser = await db.collection('masterpwd').updateOne({ _id : ObjectId(req.params.id) },{$push:{vault :req.body }}) 
        
      res.json({ newUser, message: "Password Added Successfully" });
    } else {
      res.json({ message: "Could not find user" });
    }
    client.close();
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
}
});

router.put("/update/:id/:username", async (req, res) => {
    try {
        let client = await MongoClient.connect(db_Url);
        let db = await client.db("pwdmanager");
        let user = await db.collection("masterpwd").findOne({ _id : ObjectId(req.params.id) })
        if (user) {
        
         
          let newUser = await db.collection('masterpwd').updateOne({ "vault.username":req.params.username },{$set:{"vault.$.sitepassword": req.body.sitepassword }}) 
            
          res.json({ newUser, message: "Record updated Successfully" });
        } else {
          res.json({ message: "Could not find record" });
        }
        client.close();
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/delete/:id/:username", async (req, res) => {
    try {
        let client = await MongoClient.connect(db_Url);
        let db = await client.db("pwdmanager");
        let user = await db.collection("masterpwd").findOne({ _id : ObjectId(req.params.id) })
        if (user) {
        
         
          let newUser = await db.collection('masterpwd').updateOne({ _id : ObjectId(req.params.id) },{$pull:{vault:{username:req.params.username}}}) 
            
          res.json({ newUser, message: "Record deleted Successfully" });
        } else {
          res.json({ message: "Could not find user" });
        }
        client.close();
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;