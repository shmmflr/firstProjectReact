import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosServices} from "../../../Services/AxiosServices.js";
import {messageAlert} from "../../../Until/Alert.js";

export const deleteUser = createAsyncThunk('/user/deleteUser', async (id, {rejectWithValue}) => {
    try {
        const res = await AxiosServices.delete(`/users/${id}`);
        if (res.status === 200) {
            messageAlert("کاربر با موفقیت حذف شد.", "success");
            return id;
        }
    } catch (error) {
        messageAlert(error.response?.data?.message || "مشکلی پیش آمد!", 'error');
        return rejectWithValue(error.response?.data);

    }
})