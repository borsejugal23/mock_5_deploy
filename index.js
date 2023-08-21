const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const {doctorRouter}=require("./route/doctor.route")



const app=express();
require("dotenv").config()
const cors=require("cors");
app.use(cors())

app.use(express.json());

app.use("/users",userRouter);
app.use("/doctors",doctorRouter)

app.listen(process.env.port,async()=>{
    await connection
    console.log("connected to db")
console.log(`server is listening to ${process.env.port}`)
})
