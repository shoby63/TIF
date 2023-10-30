const { json } = require('body-parser');
const express =require('express');
const router=express.Router();
router.post('/v1/member',(req,res)=>{
    res.send("Member added");
});
router.delete('/v1/member/:id',(req,res)=>{
    res.send("Member deleted");
});
module.exports=router;