import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/users/slice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import module from "./EditPostPage.module.css";

const validationSchema = Yup.object({
    title: Yup.string(),
    text: Yup.string()
});

const EditPostPage = () => {
    const { id } = useParams();
    const isLoggedIn = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        text: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then(({ data }) => {
                setInitialValues({
                    title: data.doc.title,
                    text: data.doc.text,
                    imageUrl: data.doc.imageUrl
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleFileSubmit = async (event, setFieldValue) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token is missing!");
            }

            const { data } = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setImageUrl(data.url);
            setFieldValue("imageUrl", data.url);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (values) => {
        const fields = { title: values.title, text: values.text, imageUrl: imageUrl };
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token is missing!");
            }

            const { data } = await axios.patch(`http://localhost:3000/posts/${id}`, fields, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);

            navigate(`/posts/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={module.formDiv}>
            <div className={module.addPostForm}>
                <h1 className={module.formHeader}>Edit Post</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className={module.form}>
                            <div className={module.formLabel}>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={module.inputField}
                                    placeholder="Enter title"
                                />
                                <ErrorMessage className={module.error} name="title" component="span" />
                            </div>

                            <div className={module.formLabel}>
                                <Field
                                    as="textarea"
                                    id="text"
                                    name="text"
                                    className={module.textareaField}
                                    placeholder="Enter text"
                                />
                                <ErrorMessage className={module.error} name="text" component="span" />
                            </div>

                            <div className={module.formLabel}>
                                <button
                                    type="button"
                                    className={module.fileButton}
                                    onClick={() => document.getElementById('image-upload').click()}
                                >
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    id="image-upload"
                                    className={module.hiddenInput}
                                    onChange={(e) => handleFileSubmit(e, setFieldValue)}
                                />
                            </div>

                            <button type="submit" className={module.formButton}>Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditPostPage;
