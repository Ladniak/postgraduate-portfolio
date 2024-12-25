import clsx from "clsx";
import module from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/users/slice";

const buildCssClasses = ({ isActive }) => clsx(module.link, isActive && module.active);

export const Navigation = () => {
    const isLoggedIn = useSelector(selectIsAuth);

    return (
        <div className={module.navigation}>
            <NavLink className={buildCssClasses} to="/">Portfolio</NavLink>
            {isLoggedIn && (
                <NavLink className={buildCssClasses} to="/new-post">Add Post</NavLink>
            )}
            {isLoggedIn && (
                <NavLink className={buildCssClasses} to="/my-posts">My Posts</NavLink>
            )}
        </div>
    );
};
