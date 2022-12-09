const express= require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.get("/api",(req,res)=>{
    res.json({
        msg:"Welcome to the API"
    })
})

app.get("/showAllpost",verifyToken,(req,res)=>{
    jwt.verify(req.token,'sparsh30',(err,data)=>{
        if(err) console.log(err)
        else{
            res.json({
                msg:"All posts are viewed"
            })
        }
    })
})

app.post("/login",(req,res)=>{
    const user={
        id:1,
        name:"sparsh",
        password:30
    }

    jwt.sign({user:user},'sparsh30',{expiresIn:'60s'},(err,token)=>{
        res.json({token})
    })

})

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    console.log('bearerToken',bearerHeader)

    if(typeof bearerHeader!=undefined){
        const bearer =bearerHeader.split(" ")
        const token=bearer[1]
        req.token=token
        next()
    }
    else{
        res.sendStatus(403)
    }
}

const PORT=6000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))