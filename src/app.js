require('dotenv').config()
const express = require('express') //imports express
const fs = require('fs') //imports file system functions
const path =require('path') //imports path utils
const hbs=require('hbs') //imports handlebars
const item = require('./models/item')
const mongoose = require('mongoose')
const { title } = require('process')
//add other imports here

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


const app = express(); //creates express application and returns an object
const port=3000; //selects the port to be used
const port = process.env.PORT; //selects the port to be used
app.use(express.json())

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static('./public')) //points to static resources like css, client side js etc.
app.set('view engine','hbs') //tells express top use handlebars templating engine
app.set('views',viewsPath) //sets the apps view directory to the viewsPath defined above
hbs.registerPartials(partialsPath)//registers the partials for the app

/* GET index listing. */
app.get('/', (req, res)=> {
    res.render('index', { title: "Ben's Market", description: "Always better than Craig's!" });
    //This will embed the index.hbs view inside the body of layout.hbs
});

//View all items
app.get('/items', (req, res)=> {
    item.find({},(error, result)=>{
        if(error)
            res.send({error: 'Something went wrong. Try again!'})
        else{
            const lstNames=[]
            result.forEach(item=>lstNames.push({_id:item._id,title:item.title}))
            res.send(lstNames)
        }
    })
});

//Get item details
app.get('/items/:id', (req, res)=> {
    item.find({_id: req.params.id},(error, result)=>{
        if(error)
            res.send({error: 'Something went wrong. Try again!'})
        else {
            if(result.length === 0)
                res.send({error: 'Entry not found'})
            else
                res.send(result[0])
        }
    })
});

//List an item
app.post('/items',(req,res)=>{
    const entry = req.body
    item.create(entry,(error,result)=>{
        if(error)
            res.send({error: 'Error saving entry'})
        else
            res.send(entry)
    })
})

//Delete an item
app.delete('/items/:id', (req, res)=> {
    item.find({_id: req.params.id},(error, result)=>{
        if(error)
            res.send({error: 'Something went wrong. Try again!'})
        else {
            if(result.length === 0)
                res.send({error: 'Item not found'})
            else
            item.deleteOne({_id : req.params.id}, (error, result) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(result);
                    res.send({result: "Deleted item successfully"})
                }
            })
        }
    })
});

/* GET 404 listing. */
app.get('*', (req, res)=> {
    res.render('notFound')
});