"use client";
import React, { useState } from "react";
import styles from "./sidenavMobile.module.css";
import SideNav from "./sidenav";

export default function SidenavMobile({ closeMobileSidebar }) {
  const closeSidebar = () => {
    if (closeMobileSidebar) {
      closeMobileSidebar();
    }
  };
  return (
    <div className={styles["sidebar_mobile_container"]}>
      <div className={styles["inner_container"]}>
        <p onClick={closeMobileSidebar} className={styles["sidebar_close"]}>
          &times;
        </p>
        <SideNav toggleSidebar={closeSidebar} closeSidebar={closeSidebar} />
      </div>
      <div
        className={styles["empty_container"]}
        onClick={closeMobileSidebar}
      ></div>
    </div>
  );
}
