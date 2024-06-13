const express = require('express');

const app = express();


//end point for the main page 
app.get("/", (req,res) =>{

    res.send("hellow prabod site is working")
});

// end point for the other page 

app.get("/blog", (req,res) =>{

    res.send("prabod site is working on blog site")
});

module.exports=app
