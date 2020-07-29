const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const hbsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views loacation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(hbsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))//custmize server



// app.get('/help', (req, res) => {
    
//     res.send('Help page !')
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>Welcome to about page.</h1>')
// })
///////////////////HBS/////////////////////////
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Pranay Shende'
    })  //this is need to match with file under view folder ex. index without extenstion
        // rendering = create file anywhere and run it using express
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Pranay Shende'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Pranay Shende',
        helpText: 'This is some helpful text'
    })
})
// instructor code
app.get('/weather', (req, res) =>{
    
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })



//////////My code//////////////
    // geocode(req.query.address, (error, data) => {
    //     if (error)
    //     {
    //         return res.send({error})
    //     }
        
    
    //     forecast( data.latitude, data.logitude, (error, forecastData) => {
    //         if(error)
    //             {
    //                return res.send({error})
    //             }
    //        res.send({
    //         Location: data.location,
    //         forecaste: forecastData  

    //        })     
            
    //       })
    // })

})

app.get('/product', (req, res) => {

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide the search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404 error',
        name: 'Pranay Shende',
        errorMsg: 'Help article not found.'
    })    
})
app.get('*', (req, res )=> {
    res.render('404', {
        title: '404 error',
        name: 'Pranay Shende',
        errorMsg: 'Page not found.'

    })
} )
//app.com
//app.com/help
//app.com/about
//app.com/weather
app.listen(3000, () => {
    console.log('Server is up and running !')
}) //// start up the server