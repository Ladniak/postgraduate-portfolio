import module from "./PostPage.module.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, fetchRemove } from "../../redux/posts/operations";
import Markdown from "react-markdown";

const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.data);
    const { post, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [id, dispatch]);

    const handleUpdate = () => {
        navigate(`/posts/${id}/edit`);
    };

    const onDelete = (id) => {
        dispatch(fetchRemove(id))
        navigate(`/`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found</p>;

    const formattedDate = new Date(post.createdAt).toISOString().split("T")[0];
    const defaultImage = "../../../img/postgraduate.jpg";
    const imageUrl = post.imageUrl
        ? `http://localhost:3000${post.imageUrl}`
        : defaultImage;

    const userId = post.user._id
    const isAuthor = userData?.user?._id === userId;

    return (
        <div className={module.container}>
            <div className={module.firstContent}>
                <img src={imageUrl} className={module.image} alt="Post image" />
                <div className={module.infoDiv}>
                    <p><strong>Author:</strong> {post.user?.name || "Unknown"}</p>
                    <p><strong>Created at:</strong> {formattedDate || "Invalid Date"}</p>
                    <p><strong>Views:</strong> {post.viewsCount}</p>
                </div>
                {isAuthor && (
                    <div className={module.actionButtons}>
                        <button onClick={() => onDelete(post._id)} className={module.deleteButton}>
                            Delete
                        </button>
                        <button className={module.updateButton} onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                )}
            </div>
            <div className={module.contentDiv}>
                <h1 className={module.title}>{post.title}</h1>
                <Markdown>{post.text}</Markdown>
            </div>


        </div>
    );
};

export default PostPage;
