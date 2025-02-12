import {asyncThunkCreator, createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosServices} from "../../../Services/AxiosServices.js";
import {messageAlert} from "../../../Until/Alert.js";


export const createUser = createAsyncThunk('/user/createUser', async (data, {rejectWithValue}) => {
    try {
        const res = await AxiosServices.post('/users', data);
        if (res.status === 201) {
            messageAlert('کاربر با موفقیت ثبت شد', 'success');
            return res.data
        }
    } catch (error) {
        messageAlert(error.response?.data?.message || "مشکلی پیش آمد!", 'error');
        return rejectWithValue(error.response?.data);
    }

})