
const admin = require("firebase-admin");
const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')
app.use(bodyParser.json())
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
            res.send(doc.data())
        }).catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
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


app.listen(5000, () => {
    console.log('listening on port 5000')
})