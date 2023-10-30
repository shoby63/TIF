const { json } = require('body-parser');
const express =require('express');
const router=express.Router();
router.post('/v1/role',(req,res)=>{
    res.send("role created");
});
router.get('/v1/role',(req,res)=>{
    res.send("user role");
});
module.exports=router;