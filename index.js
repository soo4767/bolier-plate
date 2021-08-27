const express = require('express')
const app = express()
const port = 5000
const body_parser = require("body-parser")
const mongoose = require('mongoose')

const config = require("./config/key")

const { User } = require("./models/User")

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());


mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true , useCreateIndex : true , useFindAndModify : false
}).then(()=> console.log("mongoDB Connected..")) 
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! ~안녕하세요')
})

app.post("/register",(req,res) => {
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})