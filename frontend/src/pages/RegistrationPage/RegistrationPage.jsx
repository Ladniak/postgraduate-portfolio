import module from "./RegistrationPage.module.css"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "The name is too short")
        .required("Name is a required field"),
    email: Yup.string()
        .email("Email format is incorrect")
        .required("Email is a required field"),
    password: Yup.string()
        .min(6, "The password is too short")
        .required("Password is a required field"),
});

const RegistrationPage = () => {

    const handleSubmit = (values, actions) => {
        console.log(values);
        actions.resetForm();
    };

    return (

        <div className={module.formDiv}>
            <div className={module.registerForm}>
                <h1 className={module.formHeader}>Sign Up</h1>
                <p>Sign up to continue</p>
                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={module.form}>
                        <label className={module.formLabel}>
                            <Field placeholder="Name" className={module.input} type="name" name="name" />
                            <ErrorMessage className={module.error} name="name" component="span" />
                        </label>
                        <label className={module.formLabel}>
                            <Field placeholder="Email" className={module.input} type="text" name="email" />
                            <ErrorMessage className={module.error} name="email" component="span" />
                        </label>
                        <label className={module.formLabel}>
                            <Field placeholder="Password" className={module.input} type="password" name="password" />
                            <ErrorMessage className={module.error} name="password" component="span" />
                        </label>
                        <button className={module.formButton} type="submit">Sign up</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RegistrationPage;