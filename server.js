const express= require('express');
const mysql= require('mysql2')
const cors=require('cors')

const app=express();

app.use(express.json())
app.use(cors())

const userRouter = require('./routers/user')
const blogsRouter = require('./routers/blogs')
const categoryRouter=require('./routers/category')



app.use('/user',userRouter)
app.use('/blogs',blogsRouter)
app.use('/category',categoryRouter)



app.listen(4000,'0.0.0.0',()=>{
    console.log('connected to the port 4000')
})