
const admin = require("firebase-admin");
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const upload = multer();
const axios = require('axios');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cors())
const serviceAccount = require("./config/edhapp-3a149-firebase-adminsdk-yt7lk-df33f235c6.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}


app.get('/user', (req, res) => {
    const db = admin.firestore();
    const user = db.collection('user');
    user.get()
        .then(snapshot => {
            const a = snapshot.docs.reverse()
            const data = a.map((doc, index) => {
                let user = doc.data()
                return [
                    index + 1,
                    user.userName,
                    user.status
                ]
            });
            res.send(data)
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
})


app.get('/trainer', (req, res) => {
    const db = admin.firestore();
    const trainers = db.collection('trainer');
    trainers.get()
        .then(snapshot => {
            const a = snapshot.docs.reverse()
            const data = a.map((doc, index) => {
                let trainer = doc.data()
                return [
                    index + 1,
                    trainer.image,
                    trainer.trainerName,
                    trainer.history
                ]
            });
            res.send(data)
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
})


app.get('/payment', (req, res) => {
    const db = admin.firestore();
    const collection = db.collection('payment');
    collection.get()
        .then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
            });
            data = data.reverse()
            const D = data.map(async (item, index) => {
                const date = String(new Date(item.paydate._seconds * 1000)
                    .toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }))
                const courseName = (await item.courseId.get()).data().name
                const userName = (await item.userId.get()).data().userName
                return [
                    index + 1,
                    item.bill,
                    courseName,
                    date,
                    userName,
                    item.status,
                ]
            })
            Promise.all(D).then(data => {
                res.send(data)
            })
                .catch(err => {
                    res.status(500).send(err)
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
})

app.get('/course/:id', (req, res) => {
    const db = admin.firestore();
    const collection = db.collection('course');
    collection.doc(req.params.id).get()
        .then(doc => {
            const { list } = doc.data()
            let { courseName, courseSRC } = list
            let dataRows = []
            courseName.forEach((item, index) => {
                dataRows.push([index + 1, item, courseSRC[index]])
            })
            res.send(dataRows)
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
})

app.patch('/course/:id/media', (req, res) => {
    const db = admin.firestore();
    const collection = db.collection('course');
    // edit list in course
    collection.doc(req.body.params.id).update({
        list: req.body.body
    })
    res.end()
})

app.get('/course', (req, res) => {
    const db = admin.firestore();
    const collection = db.collection('course');
    collection.get()
        .then(snapshot => {
            const a = snapshot.docs.reverse()
            const data = a.map((doc, index) => {
                let course = doc.data()
                return [
                    index + 1,
                    course.image,
                    course.name,
                    course.price,
                    course.description,
                    doc.id,
                    "xxx",
                    course.status,
                ]
            })
            res.send(data)

        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
})

app.post('/payment/notify', upload.single('image'),(req,res)=>{
    const db = admin.firestore();
    const collection = db.collection('payment');
    // save image to storage
    collection.add({
        paydate: admin.firestore.Timestamp.fromDate(new Date()),
        userId: db.collection('user').doc(req.body.userId),
        courseId: db.collection('course').doc(req.body.courseId),
        status:"pending",
    })
    const token = req.body.token
   const image = req.file
    res.end()
})


app.listen(5000, () => {
    console.log('listening on port 5000')
})