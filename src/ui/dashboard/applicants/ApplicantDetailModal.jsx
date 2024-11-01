"use client";

import React from "react";
import styles from "./ApplicantDetailModal.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/axios";

export default function ApplicantDetailModal(props) {
    const [localApplicantDetail, setLocalApplicantDetail] = useState({});
    console.log("localApplicantDetail", localApplicantDetail);
    console.log("props.selectedRowId", props.selectedRowId);
    const closeDetailsModal = () => {
        // props.setSelectedRowId(null);
        props.setDetailsModalOpen(false);
    };

  

    // API Calling

    async function fetchApplicantDetail() {
        try {
            const response = await axiosInstance.get(
                `/licence-applicants/individual/detail/${props.selectedRowId}`
            );
            // console.log('response', response)
            if (response.data) {
                setLocalApplicantDetail(response.data);
            }
        } catch (error) {
            console.error("An error occured", error.message);
        }
    }

    // Execute the function to fetch user
    useEffect(() => {
        if (props.selectedRowId !== null) {
            fetchApplicantDetail();
            
        }
    }, [props.selectedRowId]);

    return (
        <div
            className={styles["custom_modal_container"]}
            onClick={closeDetailsModal}
        >
            <div className={styles["custom_modal"]}>
                <div className={styles["modal_header"]}>
                    <h2>Details</h2>

                    <p
                        onClick={closeDetailsModal}
                        className={styles["close_button"]}
                    >
                        &#215;
                    </p>
                </div>
                <div className={styles["modal_content"]}>
                    <div>
                        <div className={styles["user_licence_status"]}>
                            <p>{localApplicantDetail.licence_class}</p>
                            <p>
                                {localApplicantDetail.status === "no_response"
                                    ? "no response"
                                    : localApplicantDetail.status}
                            </p>
                        </div>
                        <h3 className={styles["user_name"]}>
                            {localApplicantDetail.name}
                        </h3>
                        <div className={styles["user_address"]}>
                            <p>
                                {localApplicantDetail.street},{" "}
                                {localApplicantDetail.suburb}
                            </p>
                            <p>
                                {localApplicantDetail.city},{" "}
                                {localApplicantDetail.postal_code}
                            </p>
                        </div>
                        <div className={styles["user_activity"]}>
                            <p>Activity</p>
                            <div className={styles["user_activity_timing"]}>
                                <p>Date First Listed on:</p>
                                <p>
                                    {
                                        localApplicantDetail.date_first_listed_on_website
                                    }
                                </p>
                            </div>

                            {localApplicantDetail.letters_sent &&
                                localApplicantDetail.letters_sent.length > 0 &&
                                localApplicantDetail.letters_sent.map(
                                    (detail, index) => (
                                        <div
                                            key= {index}
                                            className={
                                                styles["user_activity_timing"]
                                            }
                                        >
                                            <p>Send {index + 1}:</p>
                                            <p>{detail.formatted_send_date}</p>
                                        </div>
                                    )
                                )}

                            {/* <div className={styles["user_activity_timing"]}>
                                <p>Send 4:</p>
                                <p>17-05-2023</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
