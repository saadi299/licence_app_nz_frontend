import React from "react";
import styles from "./dashboard-statistics.module.css";
import Image from "next/image";
import Link from "next/link";

const StatisticItem = ({ iconSrc, label, value, href }) => {
    return (
        <div className={styles["total_statistics_value"]}>
            <div>
                <div className={styles["logo_div"]}>
                    <Image
                        src={iconSrc}
                        width={19}
                        height={19}
                        style={{
                            objectFit: "contain",
                        }}
                        alt="icon"
                    />
                </div>
                <div className={styles["total_count_text"]}>
                    <p>{label}</p>
                    <h3>{value}</h3>
                </div>
            </div>
            <div className={styles["navigate_btn"]}>
                <Link href={href}>
                    <Image
                        src="/images/Arrow2.png"
                        width={7}
                        height={7}
                        alt="icon"
                    />
                </Link>
            </div>
        </div>
    );
};

export default StatisticItem;
