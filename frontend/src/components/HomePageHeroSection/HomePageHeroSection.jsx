import module from "./HomePageHeroSection.module.css";

const HomePageHeroSection = ({ onClick }) => {
    return (
        <div className={module.backBody}>
            <h1 className={module.paragraph}>
                Welcome to the site where every graduate student can maintain their own portfolio
            </h1>
            <button className={module.btn} onClick={onClick}>
                Read More
            </button>
        </div>
    );
};

export default HomePageHeroSection;
