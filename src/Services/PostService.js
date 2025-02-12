import {AxiosServices} from "./AxiosServices.js";
import {confirmAlert, messageAlert} from "../Until/Alert.js";
import Swal from "sweetalert2";

//GET POSTS
export const getPostsService = async (setPosts) => {
    await AxiosServices.get('/posts')
        .then((res) => {
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

//GET POST

export const getPostService = async (setPost, postId) => {
    await AxiosServices.get(`/posts/${postId}`)
        .then((res) => {
            // setPost({
            //     userId: res.data.userId, title: res.data.title, body: res.data.body,
            // });
            setPost(res.data);
        })
}

//CREATE POST
export const createPostService = async (post) => {
    await AxiosServices.post('/posts', post)
        .then((res) => {
            if (res.status === 201) {
                messageAlert('پست با موفقیت ساخته شد!', 'success', 'close')
            }
        })
        .catch((e) => {
            messageAlert(e.message, 'error', 'بستن')
        })
}

//UPDATE POST
export const updatePostService = async (postId, post) => {
    await AxiosServices.put(`/posts/${postId}`, post)
        .then((res) => {
            if (res.status === 200) {
                messageAlert('پست با موفقیت بروزرسانی شد', 'success', 'درود')
            }
        })
        .catch((err) => {
            messageAlert(err.message, 'error', 'باشه')
        });
}

//DELETE POST
export const deletePostService = async (posts, setPosts, id) => {
    await AxiosServices.delete(`/posts/${id}`)
        .then((res) => {
            if (res.status === 200) {
                const newPosts = posts.filter((post) => post.id !== id);
                setPosts(newPosts);
                messageAlert('حذف با موفقیت انجام شد', 'success', 'باشه')
            }
        })
        .catch((err) => {
            Swal.fire({
                title: err.message, icon: 'error',
            });
        });
}

