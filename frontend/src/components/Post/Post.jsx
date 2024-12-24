import { Link } from "react-router-dom";
import module from "./Post.module.css"

const Post = ({ post, isFullPost }) => {
    if (!post) {
        return <p>Немає даних для відображення</p>;
    }

    const { _id, title, text, user, createdAt, viewsCount } = post;

    return (
        <div className={module.post}>
            <h3 className={module.postTitle}>{isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}</h3>
            <p className={module.postText}>{text}</p>
            <p>{user?.name}</p>
            <p>{createdAt}</p>
            <p>Views: {viewsCount}</p>
        </div>
    );
};

export default Post;
