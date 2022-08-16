import { createSlice } from "@reduxjs/toolkit";
import baseURL from './BaseUrl'



const customer=[]
////////////////////////////////////
const CustomerSlice = createSlice({
  name: "customer",
  initialState: customer,
  reducers: {
    addCustomer: (state, { payload }) => {
      const data=[...payload];
      return data;
    },
  }
});

export const { addCustomer, editCustomer, deleteCustomer } =
  CustomerSlice.actions;
export default CustomerSlice.reducer;
