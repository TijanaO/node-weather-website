const path = require('path')                                   //core module
const express = require('express')      //npm module 
const hbs = require('hbs')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Andrew Mead'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name: 'Andrew Mead'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help page',
        helpText: 'this is some helpful text',
        name: 'Andrew Mead'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: 'error page',
        name: 'Andrew Mead',
        errorMessage: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: 'error page',
        errorMessage: 'Page not found',
        name: 'Andrew Mead'
    })
    
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})