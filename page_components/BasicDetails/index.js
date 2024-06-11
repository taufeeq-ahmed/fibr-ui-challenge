import React, { useState } from 'react'
import styles from "./styles.module.css"
import { Space_Grotesk } from "next/font/google";
import Image from 'next/image';
import markerIcon from '@/public/icons/marker.svg'
import { Button, Input, Textarea } from '@chakra-ui/react'

const groteskFont = Space_Grotesk({ subsets: ["latin"] });

function BasicDetails({
    title, description
}) {
    const [mode, setMode] = useState("display")

    const handleCancel = () => {
        setMode("display")
    }

    return (
        <div className={styles.basic_details}>
            {mode === "display" ? (
                <>
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
                    <div
                        className={styles.edit_control}
                        onClick={() => { setMode("edit") }}
                    >
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
                </>
            ) : (
                <form className={styles.basic_details_form}>
                    <Input
                        size='lg'
                        className={styles.title_input}
                    />
                    <Textarea
                        className={styles.description_input}
                        rows={10}
                    />
                    <div className={styles.form_actions}>
                        <Button
                            olorScheme='#667bf6;'
                            variant='link'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme='#667bf6;'
                            variant='solid'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default BasicDetails
