const express=require('express')
const mongoose=require('mongoose')
const app=express()
const dotenv=require('dotenv').config()
const UserRouter=require('./routes/index')
const PORT =process.env.PORT||5000
const bodyParser=require('body-parser')
const cors=require('cors')
const {DB_URL}=process.env
//mongoose Connection
mongoose.connect(DB_URL)
mongoose.connection.
once('open', () => console.log("Mongo Db Connected SuccesFully...."))
    .on('error', (error) => console.error("error:::", error))

//setup middlewares
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.use('/api/user/',UserRouter)

app.get('/',(req,res)=>{
    res.send("HY hELOO")
})




app.listen(PORT,()=>console.log("Server Connected Succes",PORT))