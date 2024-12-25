import { AuthNav } from "../AuthNav/AuthNav";
import { Navigation } from "../Navigation/Navigation";
import module from "./AppBar.module.css";
import { UserMenu } from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/users/slice";

export const AppBar = () => {
    const isLoggedIn = useSelector(selectIsAuth);

    return (
        <header className={module.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};