import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/posts/operations";
import Post from "../Post/Post";
import module from "./PostList.module.css"

const PostList = () => {
    const dispatch = useDispatch();
    const { items: posts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Posts:", posts);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={module.postList}>
            {(loading ? [...Array(5)] : Array.isArray(posts) ? posts : []).map((obj, index) => (
                <div className={module.postItem} key={index}>
                    {loading ? (
                        <Post />
                    ) : obj ? (
                        <Post
                            key={obj._id}
                            post={obj}
                        />
                    ) : null}
                </div>
            ))}
        </div>
    );

};

export default PostList;
