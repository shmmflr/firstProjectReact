//get user section
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosServices} from "../../../Services/AxiosServices.js";
import {messageAlert} from "../../../Until/Alert.js";

export const getUser = createAsyncThunk('/user/getUser', async (id, {rejectWithValue}) => {
    try {
        const res = await AxiosServices.get(`/users/${id}`);
        if (res.status === 200) return res.data;

    } catch (error) {
        messageAlert(error.response?.data?.message || "مشکلی پیش آمد!", 'error');
        return rejectWithValue(error.response?.data);
    }
})