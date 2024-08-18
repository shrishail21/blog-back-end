const express=require('express')
const db=require('../db')
const util=require('../util')
const crypto=require('crypto-js')

const router=express.Router()

router.post('/register',(req,res)=>{


    const {full_name,email,password,phone_no}=req.body
    const statement=`insert into user (full_name,email,password,phone_no) values (?,?,?,?);`
    // const encryptedpassword=String(crypto.SHA256(password))

    db.pool.execute(statement,[full_name,email,password,phone_no],(error,result)=>{
        res.send(util.createResult(error,result))
    })
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body

    const statement=`select id, full_name,password,email,phone_no,isDelete from user where email=? and password=?`

    // const encryptedpassword=String(crypto.SHA256(password))

    db.pool.execute(statement,[email,password],(error,users)=>{
        if(error){
            res.send(util.createErrorResult(error))
        }
        else{
            if(users.length==0){
                res.send(util.createErrorResult('User is not found'))
            }
            else if(users[0]['isDelete']==1){
                res.send(util.createErrorResult('You have closed the account'))
            }
            else{
                res.send(util.createSuccessResult(users[0]))
            }
        }
    })
})

router.post('/close',(req,res)=>{
    const {id}=req.body
    const statement=`update user set isDelete=1 where id=?`

    db.pool.execute(statement,[id],(error,result)=>{
        res.send(util.createResult(error,result))
    })

})


module.exports=router