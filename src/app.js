const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Setup Express config path
const directoryName = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//Setup static dir
app.use(express.static(directoryName))

app.get('/',(req, res)=>{
res.render('index',{
    title:'Weather',
    name:'Rishabh'
})
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Rishabh'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        help:'Helping',
        title:'Help',
        name:'Rishabh'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({error:"Please provide address"})
    }
    geocode(req.query.address,(error,{latitude, longitude, place}={})=>{
        if(error){
            return res.send({error})
        }
    forecast(latitude,longitude,(error,dataForecast)=>{
        if(error)
        return res.send({error})

        res.send({
            location:place,
            dataForecast,
            address: req.query.address
        })
        })
    })
   
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:"ERROR",
        name: "Rishabh",
        error: "Help Page not found"
    })
})
app.get('/*',(req, res)=>{
    res.render('error',{
        title:"ERROR",
        name: "Rishabh",
        error: "Page not found"
    })
})


app.listen(3000,()=>{
    console.log("Server up on 3000")
})   