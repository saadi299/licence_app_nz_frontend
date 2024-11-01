'use client'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import CommonFormButton from "../buttons/CommonFormButton";
import CustomMuiTextField from "../mui/CustomMuiTextField";
import CustomMuiPasswordField from "../mui/CustomMuiPasswordField";
// import CustomMuiPasswordField from '../ui/mui/CustomMuiPasswordField';
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/system";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import TokenService from "@/services/tokenService";

const StyledErrorAlert = styled(Alert)`
    &.slide-in {
        animation: slideIn 0.3s ease-in-out;
    }

    &.slide-out {
        animation: slideOut 0.3s ease-in-out;
    }
`;

const StyledSuccessAlert = styled(Alert)`
    &.slide-in {
        animation: slideIn 0.3s ease-in-out;
    }

    &.slide-out {
        animation: slideOut 0.3s ease-in-out;
    }
`;



export default function LoginForm() {
    const router = useRouter();
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        message: "",
    });
    


    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });


    const loginAPI = async (email, password) => {
      // TokenService.isAuthenticated()
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log('baseUrl', baseUrl)
      const apiUrl = `${baseUrl}/users/login/`;
      try {
          const payload = {
              username: email,
              password: password,
          };
          const response = await axios.post(apiUrl, payload);
          console.log("response", response);
    
          if (response.status === 200 && !response.data.error) {
              console.log("rs", response.data);
              TokenService.setAuthUserToLocalStorage(response.data);
              setShowSuccessSnackbar(true);
              setError({
                  status: false,
                  message: "",
              });
              setLoading(false);
              return response;
          } else {
              console.log("Error");
              setError({
                  status: true,
                  message: "Invalid Credentials",
              });
          }
    
          
      } catch (error) {
          console.log("error", error);
          setError({
                  status: true,
                  message: error.message,
              });
          // throw new Error(error.response.data.error);
      }
    };
    


    const handleSubmit = async (values) => {
        console.log("values", values);
        setLoading(true);
        const loginResponse = await loginAPI(values.username, values.password);
        console.log('loginResponse', loginResponse)
        if (loginResponse.status === 200){
          router.push("/dashboard/applicants/individual/all");
        }
        
    };

    const handleSuccessSnackbarClose = () => {
        setShowSuccessSnackbar(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className={styles["form-field"]}>
                            <Field
                                name="username"
                                component={CustomMuiTextField}
                                label="E-mail"
                            />

                        </div>

                        <div className={styles["form-field"]}>
                            <Field
                                name="password"
                                component={CustomMuiPasswordField}
                                label="Password"
                            />
                          
                        </div>
                      
                       {/* FORGET PASSWORD */}
                        {/* <div
                            //   to="/forget-password"
                            className={styles["forget-password-text"]}
                            // style={{ color: theme.palette.primary.main }}
                        >
                            Forgot password?
                        </div> */}
        

                        {showSuccessAlert ? (
                            <StyledSuccessAlert
                                severity="success"
                                className={
                                    showSuccessAlert ? "slide-in" : "slide-out"
                                }
                            >
                                Login successful!
                            </StyledSuccessAlert>
                        ) : null}

                        {error.status ? (
                            <StyledErrorAlert
                                severity="error"
                                className={error ? "slide-in" : "slide-out"}
                            >
                                {error.message}
                            </StyledErrorAlert>
                        ) : null}

                        <CommonFormButton text="Sign in" loading={loading} />
                        {/* REGISTRATION LINK */}
                        {/* <div className={styles["text-after-submit"]}>
                            Wants to Create an account ?{" "}
                            <Link href="/registration">
                                {" "}
                                <span className={styles["bold-text"]}>
                                    Register Now
                                </span>{" "}
                            </Link>{" "}
                        </div> */}
                    </Form>
                )}
            </Formik>

            {/* SNACKBAR */}
            <Snackbar
                open={showSuccessSnackbar}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={handleSuccessSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSuccessSnackbarClose}
                    severity="success"
                >
                    Login successful!
                </MuiAlert>
            </Snackbar>
        </>
    );
}
