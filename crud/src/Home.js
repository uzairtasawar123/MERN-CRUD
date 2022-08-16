import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCustomer, deleteCustomer } from "./Redux/Reducer/CustomerSlice";
import { toast } from "react-toastify";
//import Slide from 'react-reveal/Slide'
import Zoom from "react-reveal/Zoom";
import baseURL from "./Redux/Reducer/BaseUrl";
//import {fetchCustomer} from './Redux/Reducer/CustomerSlice'

const Home = () => {
  const customers = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  /////////   useEffect
  useEffect(() => {
    const fetchData = async () => {
      const res = await baseURL.get(`/customer/getcustomers`);
      localStorage.setItem("fetchdata", JSON.stringify(res.data));
      dispatch(addCustomer(res.data));
    };
    fetchData();
  }, [dispatch , customers]);



  //////////////////////////////////////////
  const HandleDelete = async (id) => {
    const res = await baseURL.delete(`/customer/deletecustomer/${id}`);
    if (res) {
      toast.success(res.data)
    }
  };
  /////////////////////////////////////////
  return (
    <>
      <div className="row">
        <div className="col-md-2 px-5 py-5 ">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>

        <div
          className="col-md-8  p-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Zoom cascade bottom duration={1200}>
            <table className="table table-hover table-dark table-striped table-borderless">
              <thead className="text-white bg-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Phone No</th>
                  <th>Some Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((hello) => {
                  return (
                    <tr key={hello._id}>
                      <td>{hello._id}</td>
                      <td>{hello.name}</td>
                      <td>{hello.email}</td>
                      <td>{hello.city}</td>
                      <td>{hello.phone}</td>
                      <td>
                        <Link
                          to={`/edit/${hello._id}`}
                          className="btn btn-dark mx-2"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => HandleDelete(hello._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Zoom>
        </div>
      </div>
    </>
  );
};

export default Home;
