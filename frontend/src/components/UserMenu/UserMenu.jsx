import { useDispatch, useSelector } from "react-redux";
import module from "./UserMenu.module.css";
import { logout } from "../../redux/users/slice";

export const UserMenu = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.data);

    const handleClick = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <div className={module.userDiv}>
            <p className={module.userName}>
                {user?.user.name ? `${user.user.name}` : "Hello"}
            </p>
            <button className={module.button} type="button" onClick={handleClick}>
                Log out
            </button>
        </div>
    );
};
