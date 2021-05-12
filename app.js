const express = require("express");

const app = express();
const port = 3000;

const users = [];

const logUsers=(req,res,next)=>{
    console.log("function log user")
    res.json(users)       
     next()
}
const logMethod =(req,res,next)=>{
console.log("function logMethod")
next();
}

app.use(logUsers);
app.use("/users",logMethod)
app.use(express.json())

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.use((error1,req,res,next)=>{
    if(users.length===0){ 
           next("errer");
           console.log("no users");
           res.json("no users");
      }   
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});