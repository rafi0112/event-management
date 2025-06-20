const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());


const uri = process.env.DB_URI;
// console.log("MongoDB URI:", uri); // Log the URI to check if it's correct
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
const admin = require("firebase-admin");

const serviceAccount = require("./Firebase-secret-service-key.json");
// OR if it's in a different location:
// const serviceAccount = require("d:/web-dev-ph/Group-Study/Group-Study-Server/Firebase-secret-service-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Changed from req.header.authorization
  // console.log("Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    const idToken = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        res.status(401).send({ error: 'Unauthorized access' });
    }
}

async function run() {
    try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();


    console.log("Connected to MongoDB!");


    const collection = client.db("event-management").collection("events");

    app.get('/events', async (req, res) => {
      try {
        const events = await collection.find({}).toArray();
        res.status(200).json(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
      }
    });

    app.get('/events/:id',verifyFirebaseToken, async (req, res) => {
      const id = req.params.id;
      try {
        const event = await collection.findOne({ _id: new ObjectId(id) });
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
      } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Failed to fetch event" });
      }
    });   
    
    app.post('/events', async (req, res) => {
        const { title, description, eventDate, location, members, type, thumbnailUrl, createdBy, createdAt } = req.body;
        
        if (!title || !description || !eventDate || !location) {
            return res.status(400).json({ error: "Title, description, eventDate, and location are required" });
        }
        
        const newEvent = {
            title,
            description,
            eventDate,
            location,
            members: members || [],
            type: type || '',
            thumbnailUrl: thumbnailUrl || '',
            createdBy: createdBy || '',
            createdAt: createdAt || new Date().toISOString()
        };
        
        try {
            const result = await collection.insertOne(newEvent);
            res.status(201).json({ message: "Event created successfully", eventId: result.insertedId });
        } catch (error) {
            console.error("Error creating event:", error);
            res.status(500).json({ error: "Failed to create event" });
        }
    });

    app.patch('/events/:id', async (req, res) => {
        const id = req.params.id;
        const { userEmail } = req.body;
        
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $addToSet: { members: userEmail } }
            );
            
            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Event not found" });
            }
            
            res.status(200).json({ message: "Event updated successfully", modifiedCount: result.modifiedCount });
        } catch (error) {
            console.error("Error updating event:", error);
            res.status(500).json({ error: "Failed to update event" });
        }
    });

    app.put('/events/:id', async (req, res) => {
        const id = req.params.id;
        const updatedEvent = req.body;
        
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: {
                    title: updatedEvent.title,
                    description: updatedEvent.description,
                    type: updatedEvent.type,
                    thumbnailUrl: updatedEvent.thumbnailUrl,
                    location: updatedEvent.location,
                    eventDate: updatedEvent.eventDate,
                    members: updatedEvent.members,
                    createdBy: updatedEvent.createdBy
                }}
            );
            
            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Event not found" });
            }
            
            res.status(200).json({ message: "Event updated successfully", modifiedCount: result.modifiedCount });
        } catch (error) {
            console.error("Error updating event:", error);
            res.status(500).json({ error: "Failed to update event" });
        }
    });

    app.delete('/events/:id',verifyFirebaseToken, async (req, res) => {
        const id = req.params.id;
        
        try {
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Event not found" });
            }
            
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            console.error("Error deleting event:", error);
            res.status(500).json({ error: "Failed to delete event" });
        }
    });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);




app.get('/', (req, res)=> {
    res.send('flying onboard .............');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});