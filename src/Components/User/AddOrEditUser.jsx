import {useEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {createUserService,} from '../../Services/UserServices';
import useTitle from "../../Hook/TitleHook.js";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../Redux/users/thunks/updateUser.js";
import {getUser} from "../../Redux/users/thunks/getUser.js";
import {createUser} from "../../Redux/users/thunks/createUser.js";

const AddOrEditUser = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading, user, error} = useSelector(state => state.users)


    const [data, setData] = useState({
        name: '', username: '', email: '', address: {
            city: '', street: '', suite: '', zipcode: '',
        },
    });

    const handelUser = (e) => {
        e.preventDefault();
        if (!userId) {
            dispatch(createUser(data))
        } else {
            dispatch(updateUser({id: userId, userDate: data}));
        }
    };
    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId));
        }
    }, [userId]);
    useEffect(() => {
        if (userId && user) {
            setData({
                name: user?.name || '',
                username: user?.username || '',
                email: user?.email || '',
                address: {
                    city: user?.address?.city || '',
                    street: user?.address?.street || '',
                    suite: user?.address?.suite || '',
                    zipcode: user?.address?.zipcode || '',
                },
            });
        }
    }, [userId, user]);
    console.log("isLoading:", isLoading);
    userId ? useTitle("ویرایش مخاطب") : useTitle('ایجاد مخاطب جدید');
    return (<>
        <Outlet/>
        <div>
            <h1>{userId ? 'ویرایش کاربر' + userId : 'افزودن کاربر جدید'}</h1>
        </div>
        <hr/>
        <form onSubmit={handelUser} className="row g-3">
            <div className="col-md-4">
                <label form="inputEmail4" className="form-label">
                    نام نام خانوادگی
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    value={data.name}
                    onChange={(e) => {
                        setData({...data, name: e.target.value});
                    }}
                />
            </div>
            <div className="col-md-4">
                <label form="inputPassword4" className="form-label">
                    نام کاربری
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    value={data.username}
                    onChange={(e) => {
                        setData({...data, username: e.target.value});
                    }}
                />
            </div>
            <div className="col-md-4">
                <label form="inputPassword4" className="form-label">
                    ایمیل
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="inputPassword4"
                    value={data.email}
                    onChange={(e) => {
                        setData({...data, email: e.target.value});
                    }}
                />
            </div>
            <div className="col-6">
                <label form="inputAddress" className="form-label">
                    شهر
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder=" ساری"
                    value={data.address.city}
                    onChange={(e) => {
                        setData({
                            ...data, address: {...data.address, city: e.target.value},
                        });
                    }}
                />
            </div>
            <div className="col-6">
                <label form="inputAddress" className="form-label">
                    خیابان
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder=" 15 خرداد"
                    value={data.address.street}
                    onChange={(e) => {
                        setData({
                            ...data, address: {...data.address, street: e.target.value},
                        });
                    }}
                />
            </div>
            <div className="col-6">
                <label form="inputAddress" className="form-label">
                    پلاک
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="89"
                    value={data.address.suite}
                    onChange={(e) => {
                        setData({
                            ...data, address: {...data.address, suite: e.target.value},
                        });
                    }}
                />
            </div>
            <div className="col-6">
                <label form="inputAddress" className="form-label">
                    کد پستی
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="8918998981"
                    value={data.address.zipcode}
                    onChange={(e) => {
                        setData({
                            ...data, address: {...data.address, zipcode: e.target.value},
                        });
                    }}
                />
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
                    className={`btn ${userId ? 'btn-warning' : 'btn-success'}`}
                    disabled={isLoading} // دکمه غیرفعال می‌شود
                >
                    {isLoading ? (
                        <>
                            <span role="status">لطفا صبر کنید...</span>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        </>
                    ) : (
                        userId ? 'ویرایش کاربر ' : 'ایجاد کاربر جدید '
                    )}
                </button>

            </div>
        </form>
    </>);
};

export default AddOrEditUser;
