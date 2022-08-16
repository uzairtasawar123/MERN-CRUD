import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BaseUrl from "./Redux/Reducer/BaseUrl";
//import {addCustomer} from './Redux/Reducer/CustomerSlice'

const AddCustomer = () => {
  //////////////////////////////////////
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  //////////////////////////////////////
  const customers = useSelector((state) => state);
  console.warn("ADADADDAD", customers);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  //////////////////////////////   HandleAdd Func    /////////////////////////////////
  const HandleAdd = async (e) => {
    e.preventDefault();

    if (!name || !email || !city || !phone) {
      return toast.warning("Please Fill out all input fields");
    }
    try {
      const res = await BaseUrl.post(`/customer/add`, {
        name,
        email,
        city,
        phone,
      })
      console.log("asdsdfwerer" , res)
      if (res.data) {
        Navigate("/");
        toast.success("Customer Added Successfully");
      }

    } catch (error) {
      toast.error(error.response.data)
    }

    
    
  };

  /////////////////////////////////////
  return (
    <>
      <div className="container">
        <h1 className="my-5 text-center">Add Customer</h1>
        <div className="row ">
          <div className="col-md-6 shadow mx-auto p-5">
            <form onSubmit={HandleAdd}>
              <div className=" mb-2">
                <label>Enter your Name</label>
                <i className="fa-solid fa-users mx-1"></i>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" mb-2">
                <label>Enter your Email</label>
                <i className="fa-solid fa-envelope mx-1"></i>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className=" mb-2">
                <label>Enter your City Name</label>
                <i class="fa-solid fa-location-dot mx-1"></i>
                <input
                  type="text"
                  placeholder="City"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className=" mb-2">
                <label>Enter your Phone Number</label>
                <i class="fa-solid fa-phone mx-1"></i>
                <input
                  type="number"
                  placeholder="Phone No"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input type="submit" className="btn btn-dark w-100" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
