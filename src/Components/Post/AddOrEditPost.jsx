import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer} from "react";
import {createPostService, updatePostService} from "../../Services/PostService.js";
import {init, reducer} from "./postReduces.jsx";
import {AxiosServices} from "../../Services/AxiosServices.js";
import useTitle from "../../Hook/TitleHook.js";


const addOrEditPost = () => {
    const {postId} = useParams()
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, init);

    useEffect(() => {
        if (postId) {
            AxiosServices.get(`/posts/${postId}`)
                .then(res => {
                    dispatch({
                        type: 'updatePost', payload: res.data
                    });
                })
        }
        AxiosServices.get('/users')
            .then((res) => {
                dispatch({
                    type: 'getUsers', payload: res.data
                });
            })
    }, [])


    const handelPost = (e) => {
        e.preventDefault();
        if (!postId) {
            createPostService(state.post);
        } else {
            updatePostService(postId, state.post);
        }

    }

    const handelChangeInputValue = (e, inputName) => {
        dispatch({
            type: 'getInputValue', propName: inputName, propValue: e.target.value,
        });
    }

    postId ? useTitle('ویرایش پست') : useTitle('ایجاد پست جدید')
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
                    value={state.post.title}
                    onChange={(e) => {
                        handelChangeInputValue(e, 'title')
                    }}
                />
            </div>
            <div className="col-md-6">
                <label form="userName" className="form-label">
                    نام کاربری
                </label>
                <select className='form-select' id="userName" value={state.post.userId}
                        onChange={(e) => {
                            handelChangeInputValue(e, 'userId')
                        }}>
                    {state.users.map((user, index) => (

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
                    value={state.post.body}
                    onChange={(e) => {
                        handelChangeInputValue(e, 'body')
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