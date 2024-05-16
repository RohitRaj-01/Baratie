const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yourOrder');
}
const port = 80;

//Define Mongoose Schema
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    howMuch: String,
    yourOrder: String,
    address: String

  });
const Order = mongoose.model('order', orderSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
// set the template engiine as pug
app.set('view engine', 'pug')

//Set the View Directory
app.set('views', path.join(__dirname,'views'));

//ENNDPOINTS
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})

app.get('/order',(req,res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})

app.post('/order',(req,res)=>{
    var myData = new Order(req.body);
    myData.save().then(()=>{
        res.send("Your Order has been Confirmed!")
    }).catch(()=>{
        res.status(400).send("Your Order has not been Confirmed, Please Try Again!")
    })
    // res.status(200).render('index.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
