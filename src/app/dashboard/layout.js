"use client";
import Footer from "@/ui/Footer";
import Navbar from "@/ui/Navbar";
import DashbaordStatistics from "@/ui/dashboard/dashboard-statistics";
import SideNav from "@/ui/dashboard/sidenav";
import SidenavMobile from "@/ui/dashboard/sidenavMobile";
import styles from "./layout.module.css";
import React, { useState } from "react";
import Image from "next/image";


export default function DashboardLayout({ children }) {
    console.log('children', children)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const toggleMobileSidebar = () => {
        console.log("clickmobile");
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className={styles["layout_container"]}>
            <div
                className={`${styles["sidebar"]} ${
                    isSidebarCollapsed ? styles["collapsed_sidebar"] : ""
                }`}
            >
                <SideNav toggleSidebar={toggleSidebar} />
            </div>

            <div
                className={`${styles["main_section"]} ${
                    isSidebarCollapsed ? styles["expanded_main_section"] : ""
                }`}
            >
                <div
                    className={`${styles["navbar_section"]} ${
                        isSidebarCollapsed ? styles["collapsed_sidebar"] : ""
                    }`}
                >
                    <div className={styles["navbar_toggle"]}>
                        <Image
                            src="/images/Menubar.png"
                            width={28}
                            height={20}
                            onClick={toggleSidebar}
                            className={styles["navbar_toggle_image"]}
                            alt="ham"
                        />
                    </div>
                    <div
                        className={styles["sidebar_mobile"]}
                        onClick={toggleMobileSidebar}
                    >
                        <Image
                            src="/images/Menubar.png"
                            width={28}
                            height={20}
                            alt="ham"
                        />
                    </div>

                    <Navbar />
                </div>

                <div className={styles["table_dashboard_container"]}>
                    <DashbaordStatistics />
                    {children}
        
                    {/* <Footer /> */}
                </div>
            </div>
            <div
                className={`${styles["sidebar_mobile_container"]} ${
                    isMobileSidebarOpen ? styles["open_mobile_sidebar"] : ""
                }`}
            >
                <SidenavMobile closeMobileSidebar={closeMobileSidebar} />
            </div>
        </div>
    );
}
