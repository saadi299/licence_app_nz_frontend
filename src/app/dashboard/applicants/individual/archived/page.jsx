// "/licence-applicants/individual/all/"     =>  "/licence-applicants/individual/all/?status=archived"
// AllIndividualApplicantsList ==>

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
import { useContext } from "react";
import DashboardContext from "@/context/DashBoard/DashboardContext";
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

const Page = () => {
    //CONTEXT API
    const { updateTrigger, triggerToUpdateDashboard } =
        useContext(DashboardContext);

    console.log("ALL", updateTrigger);

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
    const [localApplicantsData, setLocalApplicantsData] = useState([]);
    console.log("localApplicantsData", localApplicantsData);

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
            name: "name",
            label: "Name",
        },
        // {
        //   name: "preferredName",
        //   label: "Preferred Name",
        // },
        {
            name: "licence",
            label: "Licence",
        },
        {
            name: "status",
            label: "Status",

            options: {
                customBodyRender: (value) => {
                    return <div style={getStatusCellStyle(value)}>{value}</div>;
                },
            },
        },
        {
            name: "sentCount",
            label: "Count",
        },
        {
            name: "street",
            label: "Street",
        },
        {
            name: "suburb",
            label: "Suburb",
        },
        {
            name: "city",
            label: "City",
        },
        {
            name: "postCode",
            label: "Post Code",
        },
        {
            name: "date_first_listed_on_website",
            label: "Listed",
        },
        // {
        //   name: "deadline",
        //   label: "Deadline",
        // },

        {
            name: "action",
            label: "Action",

            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div className={styles["action_icon"]}>
                            <InfoIcon
                                onClick={() =>
                                    viewDetailsData(tableMeta.rowData[0])
                                }
                                style={{ color: "#197E94", cursor: "pointer" }}
                            />

                            {/* <DeleteIcon
                  onClick={() => deleteRow(tableMeta.rowData[0])}
                  style={{ color: "#FF3C5F", cursor: "pointer" }}
                /> */}
                            <DeleteIcon
                                // onClick={openDeleteModal}
                                onClick={() =>
                                    deleteRowHandler(tableMeta.rowData[0])
                                }
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

    // async function fetchApplicants(){
    //     try{
    //         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //         const apiUrl = `${baseUrl}/licence-applicants/individual/all/`;
    //         const accessToken = TokenService.getAccessToken()
    //         const headers = {
    //             'Authorization' : `Bearer ${accessToken}`
    //         }
    //         console.log('accessToken', accessToken)
    //         const response = await axios.get(apiUrl, {headers})
    //         console.log('RResponse',response)
    //         setLocalApplicantsData(response.data.results)
    //     }catch(error){
    //         console.error('An error occured', error.message)
    //     }
    // }

    async function fetchApplicants() {
        try {
            const response = await axiosInstance.get(
                "/licence-applicants/individual/all/?status=archived"
            );
            setLocalApplicantsData(response.data.results);
            triggerToUpdateDashboard();
        } catch (error) {
            console.error("An error occured", error.message);
        }
    }

    // Execute the function to fetch user
    useEffect(() => {
        console.log("Use effect called");
        fetchApplicants();
    }, [updateList]);

    const muiApplicantListData = localApplicantsData.map(
        (applicant, index) => ({
            serialNumber: index + 1, // Auto-incremented serial number
            id: applicant.id,
            name: applicant.name,
            // preferredName: applicant.preferred_name,
            licence: applicant.licence_class,
            status: applicant.status,
            sentCount: applicant.letter_sent_count,
            street: applicant.street,
            suburb: applicant.suburb,
            city: applicant.city,
            postCode: applicant.postal_code,
            date_first_listed_on_website:
                applicant.date_first_listed_on_website,
        })
    );

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
                            // data={data.map((item) => [
                            //     item.name,
                            //     item.preferredName,
                            //     item.licence,
                            //     item.status,
                            //     item.street,
                            //     item.suburb,
                            //     item.city,
                            //     item.postCode,
                            //     item.date_first_listed_on_website,
                            //     item.action,
                            // ])}
                            columns={columns}
                            options={options}
                            className={styles["custom_table"]}
                        />
                        {/* <div
                          style={{
                              width: "100%",
                              height: "100%",
                              background: "yellow",
                              textAlign: "center",
                              color: "black",
                          }}
                      >
                          Individual Page
                      </div> */}

                        {detailsModalOpen && (
                            <ApplicantDetailModal
                                selectedRowId={selectedRowId}
                                setDetailsModalOpen={setDetailsModalOpen}
                                // setSelectedRowId={setSelectedRowId}
                            />
                        )}
                        {deleteModalOpen && (
                            // <div className={styles["delete_modal_container"]}>
                            //   <div className={styles["delete_modal_content"]}>
                            //     <h2>Confirm Deletion</h2>
                            //     <p>Are you sure you want to delete?</p>

                            //     <button onClick={() => deleteRow(tableMeta.rowIndex)}>Delete</button>
                            //     <button onClick={closeDeleteModal}>Cancel</button>
                            //   </div>
                            // </div>
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

                        {/* {detailsModalOpen && (
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
                                      {selectedRowId !== null && (
                                          <div>
                                              <div
                                                  className={
                                                      styles[
                                                          "user_licence_status"
                                                      ]
                                                  }
                                              >
                                                  <p>
                                                      licence class
                                                  </p>
                                                  <p>
                                                      pending
                                                  </p>
                                              </div>
                                              <h3 className={styles["user_name"]}>
                                                  arkan
                                              </h3>
                                              <div
                                                  className={
                                                      styles["user_address"]
                                                  }
                                              >
                                                  <p>
                                                     road 15
                                                  </p>
                                                  <p>
                                                      nikunja,
                                                      dhaka
                                                  </p>
                                              </div>
                                              <div
                                                  className={
                                                      styles["user_activity"]
                                                  }
                                              >
                                                  <p>Activity</p>
                                                  <div
                                                      className={
                                                          styles[
                                                              "user_activity_timing"
                                                          ]
                                                      }
                                                  >
                                                      <p>Date First Listed on:</p>
                                                      <p>
                                                          first listed date : 1-2-2024
                                                      </p>
                                                  </div>
  
                                                  <div
                                                      className={
                                                          styles[
                                                              "user_activity_timing"
                                                          ]
                                                      }
                                                  >
                                                      <p>Send 1:</p>
                                                      <p>17-02-2022</p>
                                                  </div>
  
                                                  <div
                                                      className={
                                                          styles[
                                                              "user_activity_timing"
                                                          ]
                                                      }
                                                  >
                                                      <p>Send 2 :</p>
                                                      <p>19-02-2022</p>
                                                  </div>
                                                  <div
                                                      className={
                                                          styles[
                                                              "user_activity_timing"
                                                          ]
                                                      }
                                                  >
                                                      <p>Send 3:</p>
                                                      <p>17-02-2023</p>
                                                  </div>
                                                  <div
                                                      className={
                                                          styles[
                                                              "user_activity_timing"
                                                          ]
                                                      }
                                                  >
                                                      <p>Send 4:</p>
                                                      <p>17-05-2023</p>
                                                  </div>
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              </div>
                          </div>
                      )} */}
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
};

export default IsAuth(Page);
