"use client";
import styles from "./page.module.css";
import Image from "next/image";
import authBgImage from "../../../public/images/auth-pages/auth_bg.png";
import CustomMuiTextField from "@/ui/mui/CustomMuiTextField";
import LoginForm from "@/ui/login/LoginForm";

export default function LoginPage() {
    return (
        <>
            <div className={styles["login_section"]}>
                <div className={styles["left_container"]}>
                    <div className={styles["brand_image"]}>
                        <Image
                            src={authBgImage}
                            alt="Auth Background Image"
                            fill
                            // sizes="100vw"
                            priority
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>

                <div className={styles["right_container"]}>
                    <div className={styles["auth_form"]}>
                        <div className={styles["form_logo"]}>Deloitte.</div>
                        <div className={styles["form_title_1"]}>
                            Hello! let's get started
                        </div>
                        <div className={styles["form_title_2"]}>
                            Sign in to continue.
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
}
