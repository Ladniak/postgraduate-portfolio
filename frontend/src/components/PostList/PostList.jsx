import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, fetchRemove } from "../../redux/posts/operations";
import Post from "../Post/Post";
import module from "./PostList.module.css"

const PostList = () => {
    const dispatch = useDispatch();
    const { items: posts, loading, error } = useSelector((state) => state.posts);
    const [refetch, setRefetch] = useState(false);
    const userData = useSelector((state) => state.auth.data);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, refetch]);

    const handleDeletePost = (id) => {
        dispatch(fetchRemove(id)).then(() => {
            setRefetch(prev => !prev);
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const userId = userData?.user?._id;

    return (
        <div className={module.container}>
            <h2 className={module.header}>Posts</h2>
            <div className={module.postList}>
                {(loading ? [...Array(5)] : Array.isArray(posts) ? posts : []).map((obj, index) => (
                    <div className={module.postItem} key={index}>
                        {loading ? (
                            <Post />
                        ) : obj ? (
                            <Post
                                key={obj._id}
                                post={obj}
                                userData={userId === obj.user._id}
                                onDelete={handleDeletePost}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );


};

export default PostList;
