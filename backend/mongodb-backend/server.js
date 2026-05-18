require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected Successfully to MongoDB");
    db = client.db();
  } catch (error) {
    console.log("Error connecting DB");
    process.exit(1);
  }
}

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await db
      .collection("user")
      .insertOne({ email: email, password: password });
    res.json({
      message: "success",
    });
  } catch (error) {
    res.json({
      error: "fail",
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await db.collection("user").findOne({ 'email': email, password: password });
    if (!result) {
      res.json({
        error: "fail",
      });
    } else {
      res.json({
        message: "success",
      });
    }
  } catch (error) {
    res.json({
      error: "fail",
    });
  }
});

app.post("/api/list", async (req,res)=>{
    const { email } = req.body;
    try{
        
        let resultat = await db.collection('historique').find({'email':email}).toArray();
        
        
        res.json({
            message:"success",
            reponse:resultat
        })
    }catch (error){
        
        res.json({
            error: "fail"
        })
    }
});

app.post("/api/verifier", async (req, res) => {
  try {
    const { email, message } = req.body;
    
    if (message.length > 0) {
        let resultat = "spam"; // // // // HARDCODE
      if (email.length > 0) {
        let result = await db.collection("historique").insertOne({ 'email': email, 'message': message, 'resultat': resultat });
      }
      res.json({
        message: "success",
        reponse: resultat,
      });
    }
    else{

        res.json(
            {
                error:"echec"
            }
        )
    }
  } catch (error) {
    res.json({
      error: "echec",
    });
  }
});

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log("Server Running at https://localhost:3000"),
  );
});
