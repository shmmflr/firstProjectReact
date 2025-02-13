import {Route, Routes} from 'react-router-dom';
import Blogs from '../Post/Blogs.jsx';
import Slider from './Slider';
import Users from '../User/Users';
import AddOrEditUser from '../User/AddOrEditUser';
import HeaderUserSection from '../User/HeaderUserSection';
import Counter from "../Counter/Counter.jsx";
import AddOrEditPost from "../Post/AddOrEditPost";
import Register from "../Signin/Register.jsx";

const Body = () => {
    return (<div className="col-8 mt-4 p-2">
        <Routes>
            <Route index element={<Slider/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/user" element={<AddOrEditUser/>}>
                <Route path="create" element={<HeaderUserSection/>}/>
                <Route path="edit/:userId"/>
            </Route>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path='/blog' element={<AddOrEditPost/>}>
                <Route path='create'/>
                <Route path='edit/:postId'/>
            </Route>
            <Route path="counter" element={<Counter/>}/>
            <Route path="*" element={<Slider/>}/>
        </Routes>
    </div>);
};

export default Body;
