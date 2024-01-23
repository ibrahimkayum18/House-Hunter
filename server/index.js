const express = require('express')
const cors = require('cors')
var jwt = require("jsonwebtoken");
require('dotenv').config()
const app = express()
const port = process.env.PORT | 5000;

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.pqcfxjd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("house-hunter").collection("users");
    const houseCollection = client.db("house-hunter").collection("houses");
    const bookingCollection = client.db("house-hunter").collection("bookings");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "2hr",
      });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
      console.log('inside verify token', req.headers.authorization);
      if(!req.headers.authorization){
        return res.status(401).send({message: 'unauthorize acess'})
      }
      const token = req.headers.authorization.split(' ')[1];
      // console.log(token);
      if(!token){
        return  res.status(401).send({message: 'unauthorize acess'})
      }
      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if(err){
          return res.status(401).send({message: 'unauthorize acess'})
        }
        req.decoded = decoded;
        next();
      })
      
    }

    app.post("/users", async (req, res) => {
      const data = req.body;
      const query = { email: data.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const result = await userCollection.insertOne(data);
      res.send(result);
    });

    app.get('/users', async(req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.post('/houses', async(req, res) => {
      const data = req.body;
      const result = await houseCollection.insertOne(data);
      res.send(result)
    })

    app.get('/houses', async(req, res) => {
      const result = await houseCollection.find().toArray()
      res.send(result)
    })

    app.get('/houses/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await houseCollection.find(query)
      res.send(result)
    })

    app.put('/houses/:id',async(req,res) => {
      const id = req.params.id;
      const data = req.body;
      const query = {_id: new ObjectId(id)}
      const option = {upsert: true}
      const UpdateData = {
        $set: {
         name : data.name,
         address : data.address,
         city : data.city,
         bedroom : data.bedroom,
         bathroom : data.bathroom,
         room_size : data.room_size,
         availability_date : data.availability_date,
         rent_per_month : data.rent_per_month,
         phone_number : data.phone_number,
         picture : data.picture,
         description : data.description,
         emai: data.email,
        }
      }
      const result = await houseCollection.updateOne(query, UpdateData, option);
      res.send(result)
    })

    app.delete('/houses/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await houseCollection.deleteOne(query)
      res.send(result)
    })

    app.post('/bookings', async(req, res) => {
      const data = req.body;
      const result = await bookingCollection.insertOne(data)
      res.send(result)
    })

    app.get('/bookings', async(req, res) => {
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })

    app.delete('/bookings/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('House Hunter Server Is Running')
})

app.listen(port, () => {
  console.log(`House Hunter listening on port ${port}`)
})