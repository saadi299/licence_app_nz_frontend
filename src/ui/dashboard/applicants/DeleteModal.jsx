"use client";

import React from "react";
import styles from "./DeleteModal.module.css";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "@/services/axios";

export default function DeleteModal(props) {
  console.log("props.selectedRowId", props.selectedRowId);

  const closeDeleteModal = () => {
    props.setDeleteModalOpen(false);
  };

  const deleteApplicantHandler = async () => {
    try {
      const applicantId = props.selectedRowId
      const response = await axiosInstance.delete(
        `licence-applicants/individual/delete/${applicantId}`
      );
      console.log("response", response);
      if(response.status === 200){
        props.setSnackbarMessage("Applicant Deleted!");
        props.setShowSuccessSnackbar(true);
      }
    } catch (error) {
      console.error("Error Deleting item:", error);
      throw error;
    }
    props.setUpdateList(() =>!props.updateList);
  };

  return (
    <div
      className={styles["delete_modal_container"]}
      onClick={closeDeleteModal}
    >
      <div className={styles["delete_modal_content"]}>
        <div className={styles["delete_ico"]}>
          <DeleteIcon style={{ color: "#FF3C5F", cursor: "pointer" }} />
        </div>
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this list?</p>

        <div className={styles["delete_modal_ctrl"]}>
          <button onClick={closeDeleteModal}>Cancel</button>
          <button onClick={deleteApplicantHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
}
