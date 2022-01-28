const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')


 const app = express()
 const port = process.env.PORT || 3000


 //define path for express config
 const publicDirctoryPath = path.join(__dirname,'../public')
 const viewPath =path.join(__dirname, '../templates/views')
 const partialsPath =path.join(__dirname, '../templates/partials')
 
//setup handlebars engine and view location
 app.set('view engine','hbs')
 app.set('views', viewPath)
 hbs.registerPartials(partialsPath)

 //setup static directory to serve
 app.use(express.static(publicDirctoryPath))

 //use of hbs
 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather',
         name:'sangeeta'
     })
 }) 

 app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About Me',
        name:'sangeeta'
     })
 })

 app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'sangeeta'
    })
})

 app.get('/weather',(req,res)=>{
     if(!req.query.address){
         return res.send({
             error:'please provide address'
         })
     }

       geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
               return res.send({error})
           }
           foreCast(latitude,longitude,(error,foreCastData)=>{
               if(error){
                   return res.send({eorror})
               }
               res.send({
                   forecast:foreCastData,
                   location,
                   address:req.query.address
               })
           })
       })


    //  console.log(res.query.address);
    // res.send({
      
    //     forecast:"Its sunny",
    //     location:"phildelaphia",
    //     address:req.query.address
    // })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
       error:'you must provide a search term'
    })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'sangeeta',
        errorMessage:'Help article not found!'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'sangeeta',
        errorMessage:'Page not found'

    })
})


 app.listen(port,()=>{
     console.log('running on server port '+port);
 })