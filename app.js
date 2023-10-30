// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const roleRoutes=require('./Routes/role');
const userRoutes=require('./Routes/authUser');
const communityRoutes=require('./Routes/Community');
const memberRoutes=require('./Routes/Member');
const port =3000;
 
app.use(roleRoutes);
app.use(userRoutes);
app.use(communityRoutes);
app.use(memberRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

const mongoUri="mongodb+srv://skgupta6386:rHgFiG9ClLgSj1at@shobhit.fkvcing.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
}).then(result=>{
    console.log(result);
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
}).catch(err =>{
   console.log("eror",err);
});