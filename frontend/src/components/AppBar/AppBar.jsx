import { AuthNav } from "../AuthNav/AuthNav";
import { Navigation } from "../Navigation/Navigation";
import module from "./AppBar.module.css";
import { UserMenu } from "../UserMenu/UserMenu";

export const AppBar = () => {
    const isLoggedIn = false;

    return (
        <header className={module.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};