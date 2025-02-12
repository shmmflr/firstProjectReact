import Swal from 'sweetalert2';
import {AxiosServices} from './AxiosServices';
import {messageAlert} from "../Until/Alert.js";

//GET USERS

export const getUsersService = async (setUsers, setSearch = null) => {
    await AxiosServices.get('/users')
        .then((res) => {
            setUsers(res.data);
            setSearch(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET USER
export const getUserService = async (userId, setData) => {
    await AxiosServices.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((res) => {
        setData({
            name: res.data.name,
            username: res.data.username,
            email: res.data.email,
            address: {
                city: res.data.address.city,
                street: res.data.address.street,
                suite: res.data.address.suite,
                zipcode: res.data.address.zipcode,
            },
        });
    });
};

// ADD USER

export const createUserService = async (data) => {
    await AxiosServices.post('/users', data)
        .then((res) => {
            if (res.status === 201) {
                messageAlert('کاربر با موفقیت ثبت شد', 'success', 'درود')
            }
        })
        .catch((err) => {
            messageAlert(err.message, 'error', 'باشه')
        });
};

//UPDATE USER

export const updateUserService = async (userId, data) => {
    await AxiosServices.put(`/users/${userId}`, data)
        .then((res) => {
            if (res.status === 200) {
                messageAlert('کاربر با موفقیت بروزرسانی شد', 'success', 'درود')
            }
        })
        .catch((err) => {
            messageAlert(err.message, 'error', 'باشه')
        });
};

// DELETE USER
export const deleteUserService = async (users, setUsers, id) => {
    await AxiosServices.delete(`/users/${id}`)
        .then((res) => {
            if (res.status === 200) {
                const newUsers = users.filter((user) => user.id !== id);
                setUsers(newUsers);
                messageAlert('حذف با موفقیت انجام شد', 'success', 'باشه')
            }
        })
        .catch((err) => {
            Swal.fire({
                title: err.message,
                icon: 'error',
            });
        });
};
