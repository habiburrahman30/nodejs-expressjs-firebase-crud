const { async } = require('@firebase/util');
const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});



app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.post('/create', async(req, res) => {
    try {
        console.log(req.body);
        const id = req.body.email;
        const data = {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        };
        const data2 = {
            email: req.body.user.email,
            name: req.body.user.name,
            age: req.body.user.age,
        };

        // const response = db.collection('habib').doc(id).set(data);
        // const response = (await db.collection('habib').add(data)).collection('user').doc(req.body.user.age).set(data2);
        const response = (await db.collection('habib').add(data)).collection('user').add(data2);
        res.send({ msg: 'Data added Successfully', data: data, });

    } catch (error) {
        res.send(error);
    }
});

app.get('/read/all', async(req, res) => {
    try {
        const userRef = db.collection('habib');

        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send({ msg: 'Data get Successfully', data: responseArr, });
    } catch (error) {
        res.send(error);

    }
});
app.get('/read/:id', async(req, res) => {
    try {
        const userRef = db.collection('habib').doc(req.params.id);

        const response = await userRef.get();

        res.send({ msg: 'Data get Successfully', data: response.data(), });
    } catch (error) {
        res.send(error);

    }
});

app.patch('/update/:id', async(req, res) => {
    try {
        const response = db.collection('habib').doc(req.params.id).update({
            name: 'Raser',
        });

        res.send({ msg: 'Data get Successfully', data: response, });
    } catch (error) {
        res.send(error);

    }
});

app.delete('/delete/:id', async(req, res) => {
    try {
        const response = db.collection('habib').doc(req.params.id).delete();

        res.send({ msg: 'Data get Successfully', data: response, });
    } catch (error) {
        res.send(error);

    }
});
const db = admin.firestore();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on POTR ${PORT}`);
})