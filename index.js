// NODEJS simple API server by Cody Kostyak
// Trying out nodeJS really for the first time today - learning tons about syntax in ES6 JS.
// Have all the necessary RESTful API components, although not a super
// useful example, i feel this isn't a terrible first project.
// Will work to make a client in C# to create a note-taking program.

const express = require('express');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const app = express();
const bodyParser = require('body-parser');
const url = "mongodb://localhost:27017/Dev";
const dbName = "Dev";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology:true});
var db;
var collection;

app.use(bodyParser.json());


client.connect((err)=>{
    console.log("Connected successfully to DB.");
    db = client.db(dbName);
    collection = db.collection('node1');
});


app.get('/api/notes/:id',(req,res) =>{
    var mongo_id = new mongo.ObjectID(req.params.id);
    collection.find({_id:mongo_id}).toArray((err, result)=>{
        if (err) return res.send(err);
        res.send(result);
    });
});


app.get('/api/notes', (req,res) =>{
    collection.find({}).toArray((err, docs)=>{
        if (err) return res.send(err);
        res.send(docs);
    });
});


app.post('/api/notes/', (req,res) =>{
    collection.insertOne(req.body, (err, result) =>{
        if (err) return res.send(err);
        res.send(result);
    });
});


app.delete('/api/notes', (req,res) =>{
    var mongo_id = new mongo.ObjectID(req.body._id);
    collection.deleteOne({_id:mongo_id}, (err, result)=>{
        if (err) return res.send(err);
        res.send(result);
    });
});


app.put('/api/notes/:id', (req, res) =>{
    var mongo_id = new mongo.ObjectID(req.params.id);
    collection.updateOne({_id:mongo_id}, {$set: req.body}, (err, result) =>{
        if(err) return res.send(err);
        res.send(result);
    })
})


app.listen(3000);

