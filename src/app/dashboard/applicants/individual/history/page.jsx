"use client";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
// import usersData from "../../../../../../public/data/usersData.json";
// import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IsAuth from "../../../../../../utils/isAuth";
import { axiosInstance } from "@/services/axios";
import axios from "axios";
import TokenService from "@/services/tokenService";
import ApplicantDetailModal from "@/ui/dashboard/applicants/ApplicantDetailModal";
import { Box, Button, Select, styled } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Alert from "@mui/material/Alert";
import DeleteModal from "@/ui/dashboard/applicants/DeleteModal";
import Image from "next/image";

const getMuiTheme = () =>
  createTheme({
    components: {
      MUIDataTablePagination: {
        styleOverrides: {
          root: {
            color: "#000",

            borderTop: "none",
            boxShadow: "none",
            textAlign: "center",
          },
          toolbar: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          },
          navContainer: {
            justifyContent: "flex-start",
          },
          active: {
            color: "#fff",
          },
        },
      },
    },
  });

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

const SentLetterHistoryIndividualApplicant = () => {
  // const [data, setData] = useState([]);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  
  const [updateList, setUpdateList] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  console.log("showSuccessSnackbar", showSuccessSnackbar);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // API
  const [localSentHistoryData, setLocalSentHistoryData] = useState([]);
  console.log("localSentHistoryData", localSentHistoryData);

  
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log("handleMonthChange", event.target.value);
  };



  const viewDetailsData = (index) => {
    setSelectedRowId(index);
    setDetailsModalOpen(true);
  };

  const deleteRowHandler = (index) => {
    setSelectedRowId(index);
    setDeleteModalOpen(true);
  };

  const getStatusCellStyle = (status) => {
    let backgroundColor, fontColor;

    switch (status) {
      case "archived":
        backgroundColor = "#FFDDDC";
        fontColor = "#AB4445";
        break;
      case "unprocessed":
        backgroundColor = "#FAF6E9";
        fontColor = "#D4A600";
        break;
      case "unreachable":
        backgroundColor = "#F3EBFF";
        fontColor = "#8945AA";
        break;
      case "sent":
        backgroundColor = "#E8FFEF";
        fontColor = "#1A9572";
        break;
      default:
        backgroundColor = "inherit";
        fontColor = "inherit";
    }

    return {
      backgroundColor,
      color: fontColor,
      padding: "5px 10px",
      width: "120px",
      borderRadius: "5px",
      textAlign: "center",
    };
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "applicant",
      label: "Applicant",
    },
    {
      name: "applicant_date_listed",
      label: "Date Listed",
    },
    {
      name: "send_date",
      label: "Send Date",
    },
    {
      name: "send_by",
      label: "Send By"
    },

    // {
    //   name: "status",
    //   label: "Status",

    //   options: {
    //     customBodyRender: (value) => {
    //       return <div style={getStatusCellStyle(value)}>{value}</div>;
    //     },
    //   },
    // },

    {
      name: "action",
      label: "Action",

      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={styles["action_icon"]}>
              {/* <InfoIcon
                onClick={() => viewDetailsData(tableMeta.rowData[0])}
                style={{ color: "#197E94", cursor: "pointer" }}
              /> */}

              <DeleteIcon
                // onClick={openDeleteModal}
                onClick={() => deleteRowHandler(tableMeta.rowData[0])}
                style={{ color: "#FF3C5F", cursor: "pointer" }}
              />
            </div>
          );
        },
      },
    },
  ];
  const CustomToolbar = () => (
    <>
      <Select
        className={styles["monthly_selection"]}
        native
        value={selectedMonth}
        onChange={handleMonthChange}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              marginTop: "-8px",
              maxHeight: "200px",
            },
          },
        }}
        sx={{
          marginLeft: "16px",
          minWidth: "120px",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          height: "40px",
          fontSize: "0.875rem",
          lineHeight: "1",
          "&:focus": {
            borderColor: "#3f51b5",
            boxShadow: "0 0 0 0.2rem rgba(63,81,181,.25)",
          },
        }}
      >
        <option value="">Monthly</option>
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </Select>
    </>
  );

  // Action Handler

  const handleArchivedMultipleCheckedIds = async (
    selectedIds,
    setSelectedRows
  ) => {
    // Perform email sending logic using selectedIds
    console.log("Sending emails to IDs:", selectedIds);
    try {
      const response = await axiosInstance.post(
        "/licence-applicants/individual/mark-archived/",
        { applicantIds: selectedIds }
      );
      console.log("response", response);
      if (response && response.status === 201) {
        setSnackbarMessage("Archived successful!");
        setShowSuccessSnackbar(true);
        setUpdateList(() => !updateList);
      }
    } catch (error) {
      console.error("An error occured", error.message);
    }
  };

  const handleLetterSendMultipleCheckedIds = async (
    selectedIds,
    setSelectedRows
  ) => {
    // Perform email sending logic using selectedIds
    console.log("Sending emails to IDs:", selectedIds);
    try {
      const response = await axiosInstance.post(
        "/licence-applicants/individual/letter/send/",
        { applicantIds: selectedIds }
      );
      console.log("response", response);
      if (response && response.status === 201) {
        setSnackbarMessage("Letter send successful!");
        setShowSuccessSnackbar(true);
        setUpdateList(() => !updateList);
      }
    } catch (error) {
      console.error("An error occured", error.message);
    }
  };

  const options = {
    filterType: "checkbox",
    download: true,
    print: true,
    search: true,
    pagination: true,
    viewColumns: true,
    filter:false,
    // customToolbar: () => <CustomToolbar />,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      const selectedIds = selectedRows.data.map(
        (row) => parseInt(displayData[row.index].data[0]) // Assuming ID is in the first column
      );

      return (
        <div className={styles["gift_selection"]}>
         
        <div 
        className={styles["indeterminate"]}
        onClick={() =>
         handleLetterSendMultipleCheckedIds(selectedIds, setSelectedRows)
       }
        
        >
               <div>
               <Image
               src="/images/Senttop.png"
               width={20}
               height={10}
               
             
             />
               </div>
 
               Sent
 
        </div>
 
           {/* <AttachEmailIcon
             style={{ color: "#004F6E", cursor: "pointer" }}
             onClick={() =>
               handleLetterSendMultipleCheckedIds(selectedIds, setSelectedRows)
             }
           /> */}
  <div 
        className={styles["attachemail"]}
        
        onClick={() =>
         handleArchivedMultipleCheckedIds(selectedIds, setSelectedRows)
       }>
               <div>
               <Image
               src="/images/Archivetop.png"
               width={15}
               height={12}
               
             
             />
               </div>
 
               Archive
 
        </div>
 
 
 
 
         </div>
      );
    },
  };

  // API Calling

  async function fetchSentLetterHistory() {
    try {
      const response = await axiosInstance.get(
        "/licence-applicants/individual/sent-letter/history/"
      );
      console.log('response', response)
      setLocalSentHistoryData(response.data.results);
    } catch (error) {
      console.error("An error occured", error.message);
    }
  }

  // Execute the function to fetch user
  useEffect(() => {
    console.log("Use effect called");
    fetchSentLetterHistory();
  }, [updateList]);

  const muiApplicantListData = localSentHistoryData.map((history, index) => ({
    serialNumber: index + 1, // Auto-incremented serial number
    id: history.id,
    applicant: history.applicant.name || 'Not Found',
    applicant_date_listed:history.applicant.date_first_listed_on_website || 'Not Found',
    send_date:history.formatted_send_date,
    send_by:history.created_by.name || 'Admin'
  }));

  /// Removed

  const handleSuccessSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
        style={{
          position: "fixed",
          zIndex: 9999,
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "fit-content", // Adjust width as needed
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSuccessSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className={styles["table"]}>
        <div className={styles["main_table"]}>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              data={muiApplicantListData}
              columns={columns}
              options={options}
              className={styles["custom_table"]}
            />

            {detailsModalOpen && (
              <ApplicantDetailModal
                selectedRowId={selectedRowId}
                setDetailsModalOpen={setDetailsModalOpen}
                // setSelectedRowId={setSelectedRowId}
              />
            )}
            {deleteModalOpen && (
              <DeleteModal
                selectedRowId={selectedRowId}
                setDeleteModalOpen={setDeleteModalOpen}
                updateList={updateList}
                setUpdateList={setUpdateList}
                setSnackbarMessage={setSnackbarMessage}
                setShowSuccessSnackbar={setShowSuccessSnackbar}
              />
            )}

            {/* SNACKBAR */}
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default IsAuth(SentLetterHistoryIndividualApplicant);
