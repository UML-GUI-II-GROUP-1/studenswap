const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp();
const db = admin.firestore();

app.use(cors({ origin: true }));
app.use(express.json());

// Register User
app.post('/api/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: `${firstName} ${lastName}`
        });
        res.status(201).send(userRecord);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login User
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
        // verify the password and return a token (this requires a custom authentication system or third-party service)
        res.status(200).send({ message: "Login successful", user });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Add Item to Inventory
app.post('/api/inventory', async (req, res) => {
    const { itemName, description, price, quantity, category, imageURL } = req.body;
    try {
        const item = await db.collection('inventory').add({
            itemName,
            description,
            price,
            quantity,
            category,
            imageURL,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).send({ id: item.id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get Inventory
app.get('/api/inventory', async (req, res) => {
    try {
        const snapshot = await db.collection('inventory').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(items);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

exports.api = functions.https.onRequest(app);
