import {NavLink} from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="col-3 mt-4 p-2">
            <ul className="list-group ">
                <li className="list-group-item ">
                    <NavLink
                        className={(isActive) => {
                            isActive ? 'active_li' : '';
                        }}
                        to="/"
                    >
                        اسلایدر
                    </NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink
                        className={({isActive}) => {
                            isActive ? 'active_li' : '';
                        }}
                        to="/users"
                    >
                        لیست کاربران
                    </NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink
                        className={({isActive}) => {
                            isActive ? 'active_li' : '';
                        }}
                        to="/blogs"
                    >
                        لیست مقالات
                    </NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/counter">شمارنده</NavLink>
                </li>
                <li className="list-group-item">
                    <a href="#">خروج</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
