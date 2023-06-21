const connectToMongo=require('./db')
const express=require('express')
const cors=require('cors')
const app=express()
const port=5000

app.use(express.json());
app.use(cors())
const auth=require('./routes/auth')
const notes=require('./routes/notes')




app.use('/api/auth',auth)
app.use('/api/notes',notes)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log("Your url is http://localhost:"+port)
})