const e = require("express");
const express = require("express");
const customer = require("./data");
const Contact = require("./Schema");
const ContactRoute = express.Router();

// ////////////////////   Inserting  Data to DB
// ContactRoute.post("/insertcontacts", async (req, res) => {
//   const Response = await Contact.insertMany(customer);
//   if (Response) {
//     res.status(200).send("Cutomers Added Successfully", Response);
//   } else {
//     res.send("Can't Add");
//   }
// });

///////////////////   Adding Customer     ////////////////////

ContactRoute.post("/add", async (req, res) => {
  try {
    const EmailPresent = await Contact.findOne({ email: req.body.email });
    if (EmailPresent) {
      res.status(500).send("Please Enter a Unique Email ID");
    }
    const NumberPresent = await Contact.findOne({ phone: req.body.phone });
    if (NumberPresent) {
      res.status(500).send("Please Enter a Unique Phone No");
    }
    const AddCustomer = await Contact.create({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        phone:req.body.phone
    })
    res.send({
       id:AddCustomer._id,
       name:AddCustomer.name,
       email:AddCustomer.email,
       city:AddCustomer.city,
       phone:AddCustomer.phone
    })


  } catch (error) {
      res.status(500).send("Some erorr occur")
  }
});

//////////////////////    Getting All Customers   ////////////////////////////////
ContactRoute.get('/getcustomers' , async (req , res)=>{
    const GetCustomers = await Contact.find();
    if(GetCustomers){
    res.status(200).send(GetCustomers)
    }
    else{
        res.status(404).send("Not Found")
    }
})



/////////////////    Edit Customer    ////////////////////////
ContactRoute.put('/update/:id' , async (req , res)=>{
  try {
    const {name , email , city , phone} = req.body 
    const EmailCheck = await Contact.findOne({email:email})
    if(EmailCheck){
      return res.status(500).send("Please Enter a Unique Email ID");
      
    }
    const NumberPresent = await Contact.findOne({ phone: phone });
    if (NumberPresent) {

     return res.status(500).send("Please Enter a Unique Phone No");
    }
    const UpdateCustomer = {
        name:name,
        email:email,
        city:city,
        phone:phone
    }
    ////////////////////////////////////////////////////////////
    const ExistCustomer = await Contact.findById(req.params.id)
    if(ExistCustomer){
         const UpdateDone = await Contact.findByIdAndUpdate(req.params.id , {$set:UpdateCustomer} , {new:true})
         res.status(200).send("Updated Successfully")
    }
    else{
        res.status(404).send("Not Found")
    }
  } catch (error) {
    res.status(500).send("Some erorr occur")
  }
    
})

/////////////////    Delete  Customer    /////////////////
ContactRoute.delete('/deletecustomer/:id' , async (req , res)=>{
    const PresentCustomer = await Contact.findById(req.params.id)
    if(PresentCustomer){
        const CustomerDeleted = await Contact.findByIdAndDelete(req.params.id) 
        res.status(200).send("Customer Deleted Successfully")

    }
    else{
        res.status(404).send("Not Found")
    }
})

module.exports = ContactRoute;