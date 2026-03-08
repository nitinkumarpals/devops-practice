const express = require('express')
const mongoose = require('mongoose')
const redis = require('redis')

const app = express()

// Mongo
mongoose.connect('mongodb://mongo:27017/testdb')
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log(err))

// Redis
const redisClient = redis.createClient({
url:'redis://redis:6379'
})

redisClient.connect()

app.get('/', async (req,res)=>{

await redisClient.set("msg","HelloFromRedis")

const msg = await redisClient.get("msg")

res.send("Mongo OK | Redis OK : "+msg)

})

app.listen(3000,"0.0.0.0",()=>{
console.log("Backend Running")
})