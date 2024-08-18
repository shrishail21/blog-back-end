const express=require('express')
const db=require('../db')
const util=require('../util')
const { error } = require('console')

const router=express.Router()

router.post('/showblog',(req,res)=>{
    const{id}=req.body
    statement=`select title, contents from blogs where user_id= ?`

    db.pool.execute(statement,[id],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

router.post('/myblog',(req,res)=>{
    const{id}=req.body
    statement=`select b.id ,b.title blogTitle, c.title categoryTitle from blogs b,categories c where c.id=b.category_id and b.user_id=?`

    db.pool.execute(statement,[id],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

router.post('/addblog',(req,res)=>{
    const{title,contents,user_id,category_id}=req.body
    statement=`INSERT into blogs(title, contents,user_id,category_id) VALUES(?,?,?,?)`
    db.pool.execute(statement,[title,contents,user_id,category_id],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

router.get('/:id',(req,res)=>{
    const {id}=req.params
    console.log(id)
    statement=`select title, contents from blogs where id= ?`
    db.pool.execute(statement,[id],(error,result)=>{
        res.send(util.createResult(error,result))
    })
    
})

module.exports= router