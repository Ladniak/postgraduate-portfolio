import module from "./LoginPage.module.css"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const INITIAL_VALUES = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email format is incorrect")
        .required("Email is a required field"),
    password: Yup.string()
        .min(6, "The password is too short")
        .required("Password is a required field"),
});

const LoginPage = () => {

    const handleSubmit = (values, actions) => {
        console.log(values);
        actions.resetForm();
    };

    return (
        <div className={module.formDiv}>
            <div className={module.loginForm}>
                <h1 className={module.formHeader}>Log in</h1>
                <p>Log in to continue</p>
                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={module.form}>
                        <label className={module.formLabel}>
                            <Field placeholder="Email" className={module.input} type="text" name="email" />
                            <ErrorMessage className={module.error} name="email" component="span" />
                        </label>
                        <label className={module.formLabel}>
                            <Field placeholder="Password" className={module.input} type="password" name="password" />
                            <ErrorMessage className={module.error} name="password" component="span" />
                        </label>
                        <button className={module.formButton} type="submit">Log in</button>
                    </Form>
                </Formik>
            </div>
            {/* <img className={module.image} src="../../../img/front-view-stacked-books-graduation-cap-diploma-education-day.jpg"></img> */}
        </div>
    );
};

export default LoginPage;
