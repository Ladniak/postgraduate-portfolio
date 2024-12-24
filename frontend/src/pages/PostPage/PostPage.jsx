import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/posts/operations";

const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { post, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [id, dispatch]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;

    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p><strong>Author:</strong> {post.user?.name || "Unknown"}</p>
            <p><strong>Created at:</strong> {new Date(post.createdAt).toLocaleString() || "Invalid Date"}</p>
            <p><strong>Content:</strong> {post.text}</p>
        </div>
    );
};

export default PostPage;
