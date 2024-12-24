import clsx from "clsx";
import module from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const buildCssClasses = ({ isActive }) => clsx(module.link, isActive && module.active);

export const Navigation = () => {
    // const isLoggedIn = false;

    return (
        <div className={module.navigation}>
            <NavLink className={buildCssClasses} to="/">Portfolio</NavLink>
            {/* {isLoggedIn && (
                <NavLink className={buildCssClasses} to="/contacts">Contacts</NavLink>
            )} */}
        </div>
    );
};