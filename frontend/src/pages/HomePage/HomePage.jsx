import { useRef } from "react";
import HomePageHeroSection from "../../components/HomePageHeroSection/HomePageHeroSection";
import HomePageMoreDetail from "../../components/HomePageMoreDetail/HomePageMoreDetail";
import PostList from "../../components/PostList/PostList";

const HomePage = () => {
    const moreDetailRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <HomePageHeroSection onClick={() => scrollToSection(moreDetailRef)} />
            <div ref={moreDetailRef}>
                <HomePageMoreDetail />
            </div>
            <PostList />
        </div>
    );
};

export default HomePage;
