import { Link } from "react-router-dom";
import module from "./Post.module.css";

const Post = ({ post, isFullPost }) => {
    if (!post) {
        return <p>Немає даних для відображення</p>;
    }

    const { _id, title, user, createdAt, viewsCount, imageUrl } = post;
    const defaultImage = "../../../img/postgraduate.jpg";

    const formattedDate = new Date(createdAt).toISOString().split("T")[0];

    return (
        <div className={module.post}>
            <h3 className={module.postTitle}>
                {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
            </h3>
            <div className={module.contentDiv}>
                <img
                    src={imageUrl ? `http://localhost:3000${imageUrl}` : defaultImage}
                    alt="Post image"
                    className={module.postImage}
                />
                <div>
                    {/* <p className={module.postText}>{text}</p> */}
                    <p className={module.paragraph}><strong>User: </strong> {user?.name}</p>
                    <p><strong>Created: </strong>{formattedDate}</p>
                    <p><strong>Views: </strong> {viewsCount}</p>
                </div>
            </div>

        </div>
    );
};

export default Post;
