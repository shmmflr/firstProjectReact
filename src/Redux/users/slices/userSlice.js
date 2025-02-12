import {createSlice} from "@reduxjs/toolkit";
import {getUsers} from "../thunks/getUsers.js";
import {updateUser} from "../thunks/updateUser.js";
import {deleteUser} from "../thunks/deleteUser.js";
import {getUser} from "../thunks/getUser.js";
import {createUser} from "../thunks/createUser.js";

const initialState = {
    isLoading: false, isFetching: false, users: [], user: null, error: ''
}

const userSlice = createSlice({
    name: 'users', initialState, extraReducers: (builder) => {
        //get users section
        builder.addCase(getUsers.pending, (state) => {
            if (state.users.length > 0) {
                state.isFetching = true;

            } else {
                state.isLoading = true;
                state.isFetching = true;
            }
        })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isFetching = false;
                state.users = action.payload;
                state.user = null;
                state.error = '';
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isFetching = false;
                state.users = [];
                state.user = null;
                state.error = action.error.message;
            })
            //get user section
            .addCase(getUser.pending, (state) => {

                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = [];
                state.user = action.payload;
                state.error = '';
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.error.message;
            })
            //update user section
            .addCase(updateUser.pending, (state) => {

                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // اگر payload خالی بود، مقدار قبلی رو نگه دار
                state.user = action.payload.id ? action.payload : state.user;
                // state.user = action.payload;
                // state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
                state.error = '';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.error.message;
            })
            // create user section
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.users = [...state.users, action.payload]; // کاربر جدید را اضافه می‌کند
                state.error = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //delete user section
            .addCase(deleteUser.pending, (state) => {
                if (state.users.length > 0) {
                    state.isFetching = true;

                } else {
                    state.isLoading = true;
                    state.isFetching = true;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isFetching = false;
                state.users = state.users.filter((user) => user.id !== action.payload);

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isFetching = false;
                state.error = action.payload || "خطا در حذف کاربر";
            });

    }
})

export default userSlice.reducer;