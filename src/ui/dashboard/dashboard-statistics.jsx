"use client";
import { useState, useEffect } from "react";
import styles from "./dashboard-statistics.module.css";
import StatisticItem from "./StatisticItem";
import { axiosInstance } from "@/services/axios";
import { useContext } from "react";
import DashboardContext from "@/context/DashBoard/DashboardContext";
import { Select } from "@mui/material";

const DashbaordStatistics = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("");

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
    console.log('handleTimeRangeChange', event.target.value)
  };
    // Context
    const { updateTrigger, triggerToUpdateDashboard } =useContext(DashboardContext);
    const [localDashboardStatCounts, setLocalDashboardStatCounts] = useState(
        {}
    );
    console.log("localDashboardStatCounts", localDashboardStatCounts);

    async function DashboardStats() {
        try {
            const response = await axiosInstance.get(
                "/dashboard/applicant-stats/"
            );
            console.log("response", response);
            if(response.status === 200){
              setLocalDashboardStatCounts(response.data.results);
              // triggerToUpdateDashboard()
            }
            
        } catch (error) {
            console.error("An error occured", error.message);
        }
    }

    // Execute the function to fetch user
    useEffect(() => {
        console.log("Use effect called");
        DashboardStats();
    }, [updateTrigger]);

    return (
        <div className={styles["statistics_container"]}>
      <div className={styles["statistics_header"]}>
        <h2> Dashboard</h2>
        {/* <Select
          native
          value={selectedTimeRange}
          onChange={handleTimeRangeChange}
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
          <option value="">Select Day</option>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this_week">This Week</option>
          <option value="last_week">Last Week</option>
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="last_6_months">Last 6 Month</option>
          <option value="this_year">This Year</option>
        </Select> */}
      </div>


            <div className={styles["statistics_section"]}>
                <StatisticItem
                    iconSrc="/images/Total.png"
                    label="Total"
                    value={localDashboardStatCounts?.total_applicants || "0"}
                    href="/categories"
                />
                <StatisticItem
                    iconSrc="/images/Unprocessed.png"
                    label="Unprocessed"
                    value={localDashboardStatCounts?.total_unprocessed || "0"}
                    href="/categories"
                />
                <StatisticItem
                    iconSrc="/images/Send.png"
                    label="Send"
                    value={localDashboardStatCounts?.total_sent || "0"}
                    href="/categories"
                />
                <StatisticItem
                    iconSrc="/images/Archived.png"
                    label="Archived"
                    value={localDashboardStatCounts?.total_archived || "0"}
                    href="/categories"
                />
                <StatisticItem
                    iconSrc="/images/Unreachable.png"
                    label="Unreachable"
                    value={localDashboardStatCounts?.total_unreachable || "0"}
                    href="/categories"
                />
            </div>
        </div>
    );
};

export default DashbaordStatistics;
