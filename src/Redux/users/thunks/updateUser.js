//update user section
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosServices} from "../../../Services/AxiosServices.js";
import {messageAlert} from "../../../Until/Alert.js";

export const updateUser = createAsyncThunk('/user/updateUser', async ({id, userDate}, {rejectWithValue}) => {
    try {
        const res = await AxiosServices.put(`/users/${id}`, userDate);
        if (res.status === 200) {
            messageAlert('کاربر با موفقیت بروزرسانی شد', 'success')
            return id;
        }

    } catch (error) {
        messageAlert(error.response?.data?.message || "مشکلی پیش آمد!", 'error');
        return rejectWithValue(error.response?.data);

    }
})