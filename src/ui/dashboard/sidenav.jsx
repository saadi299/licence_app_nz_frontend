import React, { useState } from "react";
import Link from "next/link";
import styles from "./sidenav.module.css";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SideNav = ({ closeSidebar }) => {
  const [selectedMainMenu, setSelectedMainMenu] = useState(null);
  const [showIndividualLinks, setShowIndividualLinks] = useState(false);
  const [selectedIndividualSubMenu, setSelectedIndividualSubMenu] =
    useState(null);

  const selectMainMenu = (item) => {
    setSelectedMainMenu(item);
    setSelectedIndividualSubMenu(null);
    handleCloseSidebar();
    setShowIndividualLinks(false);
  };
  const selectIndividualMenu = (item) => {
    setSelectedMainMenu(item);
  };

  const toggleToShowIndividualLinks = () => {
    setShowIndividualLinks(!showIndividualLinks);
  };

  const selectSubLinkOfIndividual = (link) => {
    setSelectedIndividualSubMenu(link);
    handleCloseSidebar();
  };

  const handleCloseSidebar = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className={styles["navbar_container"]}>
      <div className={styles["logo"]} onClick={handleCloseSidebar}>
        <Link href="/">
          <Image
            src="/images/Logoicon.png"
            width={130}
            height={30}
            alt="ico"
            layout="responsive"
          />
        </Link>
      </div>

      <div className={styles["main_menu_container"]}>
        <ul className={selectedMainMenu === "dashboard" ? styles.selected : ""}>
          <div onClick={() => selectMainMenu("dashboard")}>
            <Link href="/dashboard" className={styles["main_menu"]}>
              <div className={styles["menu_icon"]}>
                <Image
                  src="/images/Dashboard.png"
                  width={30}
                  height={30}
                  alt=""
                  layout="responsive"
                />
              </div>
              <p>Dashboard</p>
            </Link>
          </div>
        </ul>

        <ul
          className={`${styles["list_link"]} ${
            selectedMainMenu === "individual-applicants" ? styles.selected_list : ""
          }`}
          onClick={() => selectIndividualMenu("individual-applicants")}
        >
          <div
            className={styles["list_menu"]}
            onClick={toggleToShowIndividualLinks}
          >
            <div className={styles["menu_icon"]}>
              <Image
                src="/images/List.png"
                width={30}
                height={30}
                alt=""
                layout="responsive"
              />
            </div>
            <p>Individual Applicants</p>
          </div>
          <div
            className={styles["arrow_icon"]}
            onClick={toggleToShowIndividualLinks}
          >
            {showIndividualLinks ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
        </ul>
        {showIndividualLinks && (
          <div className={styles["list_item"]} onClick={handleCloseSidebar}>
            <Link
              href="/dashboard/applicants/individual/all"
              className={
                selectedIndividualSubMenu === "all"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("all")}
            >
              All
            </Link>

            <Link
              href="/dashboard/applicants/individual/unprocessed"
              className={
                selectedIndividualSubMenu === "unprocessed"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("unprocessed")}
            >
              Unprocessed
            </Link>

            <Link
              href="/dashboard/applicants/individual/sent"
              className={
                selectedIndividualSubMenu === "sent"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("sent")}
            >
              Sent
            </Link>

            <Link
              href="/dashboard/applicants/individual/unreachable"
              className={
                selectedIndividualSubMenu === "unreachable"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("unreachable")}
            >
              Unreachable
            </Link>

            <Link
              href="/dashboard/applicants/individual/archived"
              className={
                selectedIndividualSubMenu === "archived"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("archived")}
            >
              Archived
            </Link>

            <Link
              href="/dashboard/applicants/individual/history"
              className={
                selectedIndividualSubMenu === "history"
                  ? styles.selectedListLink
                  : ""
              }
              onClick={() => selectSubLinkOfIndividual("history")}
            >
              History
            </Link>
          </div>
        )}

        {/* <ul
          className={selectedMainMenu === "settings" ? styles.selected : ""}
          onClick={handleCloseSidebar}
        >
          <div onClick={() => selectMainMenu("settings")}>
            <Link
              href="/dashboard/applicants/individual/all"
              className={styles["main_menu"]}
            >
              <div className={styles["menu_icon"]}>
                <Image
                  src="/images/Settings.png"
                  width={30}
                  height={30}
                  alt=""
                  layout="responsive"
                />
              </div>
              <p>Settings</p>
            </Link>
          </div>
        </ul> */}
        
       
        
      </div>
    </div>
  );
};

export default SideNav;
