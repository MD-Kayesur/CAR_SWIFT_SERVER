const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()



app.use(cors())
app.use(express.json())





const uri = 'mongodb+srv://Car_Swift:zOdo9SH0uazaY4SA@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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

    const AllCarsCollention =  client.db('Car_Swift').collection('AllCars')
    const  CostomersCollection =  client.db('Car_Swift').collection('Costomers')
    const  DiscountCarsCollection =  client.db('Car_Swift').collection('DiscountCars')
    const  RentingModeCollection =  client.db('Car_Swift').collection('RentingMode')
    const  WhyChooseUsCollection =  client.db('Car_Swift').collection('WhyChooseUs')

// AllCarsCollention

app.get('/allcar',async(req,res)=>{
    const result = await AllCarsCollention.find().toArray()
        res.send(result)
    
})


// CostomersCollection
app.get('/Costomer',async(req,res)=>{
    const result = await CostomersCollection.find().toArray()
        res.send(result)
    
})

// DiscountCarsCollection
app.get('/DiscountCar',async(req,res)=>{
    const result = await DiscountCarsCollection.find().toArray()
        res.send(result)
    
})

// RentingModeCollection
app.get('/RentingModes',async(req,res)=>{
    const result = await RentingModeCollection.find().toArray()
        res.send(result)
    
})

// WhyChooseUsCollection

app.get('/WhyChooseus',async(req,res)=>{
    const result = await WhyChooseUsCollection.find().toArray()
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
    res.send('Car_Swift is starting')
})
app.listen(port, () => {
    console.log(`Car_Swift is sitting on ${port}`);

})