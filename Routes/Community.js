const { json } = require('body-parser');
const express =require('express');
const router=express.Router();
router.post('/v1/community',(req,res)=>{
    res.send("Created Community");
});
router.get('/v1/community',(req,res)=>{
    res.send("Get all Communities");
})
router.get('/v1/community/:id/members',(req,res)=>{
    res.send("Get all members");
});
router.get('/v1/community/me/owner',(req,res)=>{
    res.send("Get my Owned Community");  
});
router.get('/v1/community/me/member',(req,res)=>{
    res.send("Get my Joined Community");
})
module.exports=router;