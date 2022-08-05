

const express=require('express');
const cors=require("cors");


const app=express();
const connection=require("./db");
const matchRouter = require("./routes/match");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>res.send('Hello'));

app.use("/cricket",matchRouter);

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("connected to MongoDB");
    }
    catch(e){
        console.log("error",e);
    }
   console.log('server started port 8080');
});