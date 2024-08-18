const express =require('express')
const db=require('../db')
const util=require('../util')

const router=express.Router()

router.get('/categoryList',(req,res)=>{
    statement=`select id, title,description from categories`

    db.pool.execute(statement,[],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

router.post('/addcategories',(req,res)=>{
    const {title,description}=req.body
    statement=`INSERT INTO categories (title,description) VALUES(?,?)`
    db.pool.execute(statement,[title,description],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

module.exports=router