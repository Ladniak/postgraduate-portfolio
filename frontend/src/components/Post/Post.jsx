import { Link, useNavigate } from "react-router-dom";
import module from "./Post.module.css";

const Post = ({ post, isFullPost, userData, onDelete }) => {
    const { _id, title, user, createdAt, viewsCount, imageUrl } = post;
    const defaultImage = "../../../img/postgraduate.jpg";
    const isAuthor = userData;
    const formattedDate = new Date(createdAt).toISOString().split("T")[0];
    const navigate = useNavigate();

    const id = post._id

    if (!post) {
        return <p>Немає даних для відображення</p>;
    }

    const handleUpdate = () => {
        console.log(id);

        navigate(`/posts/${id}/edit`);
    };

    return (
        <div className={module.post}>
            {isAuthor && (
                <div className={module.actionButtons}>
                    <button onClick={() => onDelete(post._id)} className={module.deleteButton}>
                        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" />
                        </svg>
                    </button>
                    <button className={module.updateButton} onClick={handleUpdate}>
                        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z" stroke="#000000" />
                        </svg>
                    </button>
                </div>
            )}
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
                    <p className={module.paragraph}><strong>User: </strong> {user?.name}</p>
                    <p><strong>Created: </strong>{formattedDate}</p>
                    <p><strong>Views: </strong> {viewsCount}</p>
                </div>
            </div>
        </div>
    );

};

export default Post;