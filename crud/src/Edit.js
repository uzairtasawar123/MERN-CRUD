import React, { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BaseUrl from "./Redux/Reducer/BaseUrl";
import {editCustomer} from './Redux/Reducer/CustomerSlice'


const Edit = () => {
  const { id } = useParams();
  const customers = useSelector((state) => state.customer);
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  /// console.warn("Cus :", customers);
  ///////////////////////////////////////
  ////////////////////////////////////////
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  //////////////////////////////////////////
  const response = customers.find((f) => {
    if(f.id == id){
      return f
    }
  } );
  console.warn("Res", response);
  ////////////////////////////////////////

  //////////////////////////////////////

  ////////////////////////////
  const HandleEdit = async (e) => {
    e.preventDefault();

    if (!name || !email || !city || !phone) {
      return toast.warning("Please Fill out all input fields");
    }

   try {
    const res = await BaseUrl.put(`/customer/update/${id}`,{
      name,
      email,
      city,
      phone
    })
    if(res){
      Navigate('/')
      toast.success("Customer Updated Successfully")
    }
   } catch (error) {
     toast.error(error.response.data)
   }

    

   };
  ////////////////////////////
  return (
    <>
      <div className="container">
        <h1 className="my-5 text-center">Edit Customer {id}</h1>
        <div className="row ">
          <div className="col-md-6 shadow mx-auto p-5">
            <form onSubmit={HandleEdit}>
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
                <label>Enter your City name</label>
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
                <i className="fa-solid fa-phone mx-1"></i>
                <input
                  type="number"
                  placeholder="Phone No"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-dark w-50">
                  Update Customer
                </button>
                <Link to="/" className="m-1 btn btn-danger">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
