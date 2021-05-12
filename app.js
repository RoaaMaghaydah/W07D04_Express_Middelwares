const express = require("express");

const app = express();
const port = 3000;
/*_______________________________________*/
const authRouter = express.Router();
const products = express.Router();
/*_______________________________________*/

const users = ["John", "Mark"];
const productsArr = ["keyboard", "mouse"];
/*_______________________________________*/

const logUsers = (req, res, next) => {
    console.log("function log user")
    console.log(users)
    next()
}
const logMethod = (req, res, next) => {
    console.log("function logMethod")
    console.log(req.method);
    next();
}
/*_______________________________________*/


app.use(logUsers);
app.use("/users", logMethod)
app.use(express.json())

app.use("/users", authRouter);
app.use("/products", products);

authRouter.use((req, res, next) => {
    console.log("routerrrrr")
    console.log(users);
    next();
})

authRouter.use("/create", (req, res, next) => {
    let n = req.body.name
    if (users.indexOf(n) !== -1) {
        console.log("found")
    }
    next();
})
products.use("*", (req, res, next) => {
    console.log("products router")
    next()
})
/*_______________________________________*/

authRouter.get("/", (req, res, next) => {
    res.json(users);
})

authRouter.post("/create", (req, res, next) => {
    const name = req.body.name;
    users.push(name);
    res.json(users)

})
/*_______________________________________*/


products.put("/update", (req, res, next) => {
    const random = Math.floor(users.length * Math.random())
    users[random] = req.body.name;
    res.json(users)
})

/*_______________________________________*/



app.get("/users", (req, res, next) => {
    res.json(users);

});
/*_______________________________________*/

app.get("*", (req, res, next) => {

    const err = new Error("not found")
    err.status = 404
    next(err)
})

app.post("*", (req, res, next) => {
    const err = new Error("not found")
    err.status = 404
    next(err)
})

app.put("*", (req, res, next) => {

    const err = new Error("not found")
    err.status = 404
    next(err)
})

/*_______________________________________*/

app.use((err, req, res, next) => {
    if (users.length === 0) {
        next("errer");
        console.log("no users");
        res.json("no users");
    }

    res.json({
        error: {
            status: err.status,
            message: err.message,
        },
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});