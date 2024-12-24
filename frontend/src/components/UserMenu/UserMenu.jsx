
import module from "./UserMenu.module.css"

export const UserMenu = () => {

    const handleClick = () => {
        console.log("LogOut");
    }

    return (
        <div className={module.userDiv}>
            <p className={module.userName}>Hello</p>
            <button className={module.button} type="button" onClick={handleClick}>Log out</button>
        </div>
    );
};