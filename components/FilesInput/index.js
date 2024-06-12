import React from 'react'
import styles from "./styles.module.css"
import uploadIcon from '@/public/icons/upload.svg'
import Image from 'next/image'

function FilesInput({ onClick }) {

    return (
        <div className={styles.files_input} onClick={onClick}>
            <Image
                src={uploadIcon}
                width={48}
                height={48}
            />
            <p className={styles.upload_text}>
                Upload upto 9 images here
            </p>
            <p className={styles.upload_subtext}>
                JPG or PNG upto 5MB each
            </p>
        </div>
    )
}

export default FilesInput