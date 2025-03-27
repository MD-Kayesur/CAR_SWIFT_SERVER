const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        // await client.connect();

        const AllCarsCollention = client.db('Car_Swift').collection('AllCars')
        const CostomersCollection = client.db('Car_Swift').collection('Costomers')
        const DiscountCarsCollection = client.db('Car_Swift').collection('DiscountCars')
        const RentingModeCollection = client.db('Car_Swift').collection('RentingMode')
        const WhyChooseUsCollection = client.db('Car_Swift').collection('WhyChooseUs')
        const MyCarsCollection = client.db('Car_Swift').collection('MyCars')
        const BookingCarsCollection = client.db('Car_Swift').collection('BookingCars')

        // AllCarsCollention

        app.get('/AllCars', async (req, res) => {
            const result = await AllCarsCollention.find().toArray()
            res.send(result)

        })

        // app.post('/AllCars',async(req,res)=>{
        //     const  data = req.body
        //     const result = await AllCarsCollention.insertOne(data)
        //     res.send(result)
        // })
        // CostomersCollection
        app.get('/Costomer', async (req, res) => {
            const result = await CostomersCollection.find().toArray()
            res.send(result)

        })

        // DiscountCarsCollection
        app.get('/DiscountCar', async (req, res) => {
            const result = await DiscountCarsCollection.find().toArray()
            res.send(result)

        })

        // RentingModeCollection
        app.get('/RentingModes', async (req, res) => {
            const result = await RentingModeCollection.find().toArray()
            res.send(result)

        })

        // WhyChooseUsCollection

        app.get('/WhyChooseus', async (req, res) => {
            const result = await WhyChooseUsCollection.find().toArray()
            res.send(result)

        })



        // MyCarsCollection Post

        app.post('/MyCars', async (req, res) => {
            const data = req.body
            const result = await MyCarsCollection.insertOne(data)
            res.send(result)
        })

        app.get('/MyCars', async (req, res) => {
            const result = await MyCarsCollection.find().toArray()
            const sortData = result.sort((a, b) => b.Daily_Rental_Price - a.Daily_Rental_Price)
            res.send(sortData)

        })


        app.delete('/MyCars/:id', async (req, res) => {
            const id = req.params.id
            //  console.log(id)
            const queary = { _id: new ObjectId(id) }
            const result = await MyCarsCollection.deleteOne(queary)
            res.send(result)
        })



// my car update
app.put("/MyCars/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const result = await Car.updateOne({ _id: id }, { $set: updateData });
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Car not found or no changes made" });
      }
      res.json({ message: "Car updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  




        // BookingCars
        app.post('/BookingCar',async(req,res)=>{
            const data = req.body
            const result = await BookingCarsCollection.insertOne(data)
            res.send(result)
        })


        app.get('/BookingCar', async (req, res) => {
            const result = await BookingCarsCollection.find().toArray()
            const sortData = result.sort((a, b) => b.Daily_Rental_Price - a.Daily_Rental_Price)
            res.send(sortData)

        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
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