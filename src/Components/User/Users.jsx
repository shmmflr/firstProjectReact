import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {confirmAlert} from '../../Until/Alert.js';
import useTitle from "../../Hook/TitleHook.js";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../Redux/users/thunks/getUsers.js";
import {deleteUser} from "../../Redux/users/thunks/deleteUser.js";

const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, isLoading, isFetching, users} = useSelector(state => state.users)
    const [retryInterval, setRetryInterval] = useState(null);

    useEffect(() => {
        dispatch(getUsers()); // اجرای اولیه درخواست

        return () => {
            if (retryInterval) {
                clearInterval(retryInterval); // پاک کردن تایمر هنگام خروج از کامپوننت
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                dispatch(getUsers());
            }, 10000); // هر ۲۰ ثانیه درخواست را مجدداً ارسال کن
            setRetryInterval(interval);
        } else {
            if (retryInterval) {
                clearInterval(retryInterval); // اگر درخواست موفق شد، تایمر را پاک کن
                setRetryInterval(null);
            }
        }
    }, [error, dispatch]);

    const handelDelete = (id) => {
        return confirmAlert(`آیا برای حذف کاربر ${id} اطمینان دارید؟`, 'بله، حذف شود!')
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(deleteUser(id))
                }
            });
    };

    const handelSearch = (e) => {
        // setUsers(search.filter((user) => {
        //     user.name.includes(e.target.value);
        // }));
    };
    useTitle('کاربران');
    return (<>
        <div className="d-flex justify-content-between align-items-center">
            <h1>لیست کاربران</h1>
            <Link to="/user/create" state={{x: 'alireza', y: 'amirhossein'}}>
                <button className="btn btn-success">
                    <i className="fa fa-plus"/>
                </button>
            </Link>
        </div>
        <hr/>
        <section className="intro mt-2">
            <div className="col-6 ms-4 mb-4">
                <label form="inputEmail4" className="form-label">
                    جستجو
                </label>
                <input
                    type="text"
                    placeholder="تایپ کنید"
                    className="form-control"
                    id="inputEmail4"
                    onChange={handelSearch}
                />
            </div>
            <div className="gradient-custom-2 h-100">
                {isLoading ? ('') : (isFetching ? (<div className={"d-flex justify-content-center mb-3"}>
                    <button className="btn btn-primary" type="button" disabled>
                        <span role="status">درحال بارگزاری...</span>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </button>
                </div>) : '')}
                <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            {isLoading ? <div className="spinner-grow text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : <div className="col-12">
                                {users.length ? (<div className="table-responsive">
                                    <table className="table table-dark table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">نام / نام خانوادگی</th>
                                            <th scope="col">نام کاربری</th>
                                            <th scope="col">ایمیل</th>
                                            <th scope="col">شهر محل سکونت</th>
                                            <th scope="col">عملیات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user, index) => (<tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address.city}</td>
                                            <td>
                                                        <span>
                                                          <button
                                                              className="btn btn-warning"
                                                              onClick={() => {
                                                                  navigate(`/user/edit/${user.id}`);
                                                              }}
                                                          >
                                                            <i className="fa fa-expeditedssl"/>
                                                          </button>

                                                          <button
                                                              className="btn btn-danger mx-2"
                                                              onClick={() => handelDelete(user.id)}
                                                          >
                                                            <i className="fa fa-trash"/>
                                                          </button>
                                                        </span>
                                            </td>
                                        </tr>))}
                                        </tbody>
                                    </table>
                                </div>) : (<p className="text-center alert alert-danger">
                                    {error ? error : ' اطلاعاتی دریافت نشد!!!!'}
                                </p>)}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
};

export default Users;
