import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createPostService, updatePostService, getPostService} from "../../Services/PostService.js";
import {getUsersService} from "../../Services/UserServices.js";

const addOrEditPost = () => {
    const {postId} = useParams()
    const navigate = useNavigate();
    const [post, setPost] = useState({
        id: '', userId: '', title: '', body: '',
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (postId) {
            getPostService(setPost, postId)
        }
        getUsersService(setUsers);
    }, [])


    const handelPost = (e) => {
        e.preventDefault();
        if (!postId) {
            createPostService(post);
        } else {
            updatePostService(postId, post);
        }

    }
    return (<>
        <div>
            <h1>{postId ? 'ویرایش پست' + postId : 'افزودن پست جدید'}</h1>
        </div>
        <hr/>
        <form onSubmit={handelPost} className="row g-3">
            <div className="col-md-6">
                <label form="inputEmail4" className="form-label">عنوان
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    value={post.title}
                    onChange={(e) => {
                        setPost({...post, title: e.target.value});
                    }}
                />
            </div>
            <div className="col-md-6">
                <label form="userName" className="form-label">
                    نام کاربری
                </label>
                <select className='form-select' id="userName" value={post.userId}
                        onChange={(e) => {
                            setPost({...post, userId: e.target.value})
                        }}>
                    {users.map((user, index) => (

                        <option key={index} value={user.id}>{user.name}</option>))}
                </select>
            </div>
            <div className="col-md-12">
                <label form="inputPassword4" className="form-label">
                    محتوا
                </label>
                <textarea
                    className="form-control"
                    id="inputPassword4"
                    rows="5"
                    value={post.body}
                    onChange={(e) => {
                        setPost({...post, body: e.target.value});
                    }}/>
            </div>

            <div className="col-12 d-flex justify-content-end align-items-end">
                <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    بازگشت
                </button>
                <button
                    type="submit"
                    className={`btn ${postId ? 'btn-warning' : 'btn-success'}`}
                >
                    {postId ? 'ویرایش پست ' : 'ایجاد پست جدید '}
                </button>
            </div>
        </form>
    </>);
}

export default addOrEditPost;