import React from 'react'
import styles from "./styles.module.css"
import { Space_Grotesk } from "next/font/google";
import Image from 'next/image';
import markerIcon from '@/public/icons/marker.svg'

const groteskFont = Space_Grotesk({ subsets: ["latin"] });

function BasicDetails({
    title, description
}) {
    return (
        <div className={styles.basic_details}>
            <div className={styles.display}>
                <h3
                    className={
                        `${groteskFont.className} ${styles.title}`
                    }
                >
                    {title}
                </h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.edit_control}>
                <span className={styles.edit_icon_container}>
                    <Image
                        className={styles.edit_icon}
                        src={markerIcon}
                        width={13}
                        height={13}
                    />
                </span>
                <span>Edit</span>
            </div>
        </div>
    )
}

export default BasicDetails
