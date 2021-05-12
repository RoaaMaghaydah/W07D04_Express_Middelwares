const express = require("express");

const app = express();
const port = 3000;
const authRouter = express.Router();
const users = ["John", "Mark"];

const logUsers=(req,res,next)=>{
    console.log("function log user")
    console.log(users)      
     next()
}
const logMethod =(req,res,next)=>{
console.log("function logMethod")
console.log(req.method);
next();
}

app.use(logUsers);
app.use("/users",logMethod)
app.use(express.json())

app.use("/auth", authRouter);

authRouter.use((req,res,next)=>{
    console.log("routerrrrr")
    console.log(users);
    next();
})

authRouter.get("/users",(req,res,next)=>{
    res.json(users);
})
authRouter.post("/users/create",(req,res,next)=>{

})

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