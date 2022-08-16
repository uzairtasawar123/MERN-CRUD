const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const ContactRoute = require('./Routes');
/////////////////////////////////////
const app = express();
app.use(express.json())
app.use(cors())
const port = 8000;
///////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/Crud' , (err)=>{
    if(err){
        console.log("Some error occcures : " , err)
    }
    else{
        console.log("DB Connected Successfully")
    }
}
)
////////////////////////////////////
app.use('/customer',  ContactRoute)
////////////////////////////////////
app.listen(port , ()=>{console.log(`We are listening you at http://localhost:${port}`)})
