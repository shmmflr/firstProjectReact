import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosServices} from "../../../Services/AxiosServices.js";

//get users section
export const getUsers = createAsyncThunk('/users/getUsers', async () => {
    const response = await AxiosServices.get('/users');
    return response.data;
})
//


