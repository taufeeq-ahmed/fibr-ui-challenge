import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { Space_Grotesk } from "next/font/google";
import Image from 'next/image';
import markerIcon from '@/public/icons/marker.svg'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useForm } from "react-hook-form"

const groteskFont = Space_Grotesk({ subsets: ["latin"] });

function BasicDetails({
    title, description
}) {
    const [mode, setMode] = useState("display")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        let brandData = localStorage.getItem("brandData");
        if (!brandData) {
            const newData = {
                title: "Fibr",
                description: "Fibr is an AI-driven platform that leverages artificial intelligence to optimize business processes, enhance data analytics, and automate tasks to improve efficiency and decision-making."
            }
            localStorage.setItem("brandData", JSON.stringify(newData))
            brandData = JSON.stringify(newData)
        }

        const parsedData = JSON.parse(brandData);
        if (parsedData?.title) setValue("title", parsedData.title);
        if (parsedData?.description) setValue("description", parsedData.description);

    }, [setValue])

    const onSubmit = (data) => {
        handleSave(data)
        setMode("display")
    }

    const handleCancel = () => {
        setMode("display")
    }

    const handleSave = (formData) => {
        let brandData = localStorage.getItem("brandData")
        if (!brandData) {
            localStorage.setItem("brandData", JSON.stringify({}))
            brandData = {}
        }

        brandData = { ...brandData, ...formData }
        localStorage.setItem("brandData", JSON.stringify(brandData))
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
                            {watch("title")}
                        </h3>
                        <p className={styles.description}>{watch("description")}</p>
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
                <form
                    className={styles.basic_details_form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        size='lg'
                        className={styles.title_input}
                        {...register("title")}
                    />
                    <Textarea
                        className={styles.description_input}
                        rows={10}
                        {...register("description")}
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
                            type='submit'
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
