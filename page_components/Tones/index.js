import React, { useState } from 'react'
import styles from "./styles.module.css"
import markerIcon from '@/public/icons/marker.svg'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'

const DEFAULT_VALUES = [
    {
        title: "Default Brand Tone",
        description: "Fibr's brand voice is professional and informative, focusing on clarity and precision. The content is written in a formal tone with a direct approach, using technical vocabulary that appeals to a professional audience. The language is concise, with a focus on readability and straightforward sentence structures."
    },
    {
        title: "Fibr",
        description: "The brand voice is warm and nurturing, characterized by a positive and caring tone. It blends a clear and concise style with an emphasis on ethical and sustainable practices, enhancing emotional appeal through a thoughtful mix of sentence structures."
    },
    {
        title: "Mamaearth",
        description: "The brand voice is warm and nurturing, characterized by an empathetic and trustworthy tone. It blends a clear and concise style with a touch of enthusiasm, enhancing engagement through a thoughtful mix of sentence structures."
    },
    {
        title: "Lipton",
        description: "The brand voice is encouraging and informative, characterized by a supportive and authoritative tone. It blends a clear and concise style, enhancing engagement through a thoughtful mix of sentence structures."
    },
    {
        title: "Spree",
        description: "The brand voice is warm and nurturing, characterized by an empathetic and trustworthy tone. It blends a clear and concise style with a touch of enthusiasm, enhancing engagement through a thoughtful mix of sentence structures."
    }
]

function Values() {
    const [mode, setMode] = useState("display")
    const [formData, setFormData] = useState(DEFAULT_VALUES)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            values: formData,
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values"
    })

    const handleAddValue = () => {
        append({ title: "", description: "" })
    }

    const onSubmit = (data) => {
        setFormData(data.values)
        setMode("display")
    }

    const handleCancel = () => {
        setMode("display")
    }

    return (
        <div className={styles.values}>
            <h3 className={styles.values_heading}>
                VALUES
            </h3>
            {mode === "display" ? (
                <div className={styles.values_list}>
                    {formData.map((value, index) => (
                        <div key={index} className={styles.value_item}>
                            <h4 className={styles.title}>{value.title}</h4>
                            <p className={styles.description}>{value.description}</p>
                        </div>
                    ))}
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
                </div>
            ) : (
                <form
                    className={styles.values_form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Button
                        colorScheme='#667bf6;'
                        variant='link'
                        onClick={handleAddValue}
                        className={styles.addvalue_button}
                    >
                        + Add
                    </Button>
                    {fields.map((item, index) => (
                        <div key={item.id} className={styles.value_input_item}>
                            <Input
                                type='text'
                                placeholder='Value'
                                {...register(`values.${index}.title`)}
                                className={styles.input}
                            />
                            <Textarea
                                placeholder='Description'
                                rows={5}
                                {...register(`values.${index}.description`)}
                                className={styles.input}
                            />
                            <Button
                                colorScheme='red'
                                variant='link'
                                onClick={() => remove(index)}
                                className={styles.remove_button}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <div className={styles.form_actions}>
                        <Button
                            colorScheme='#667bf6;'
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

export default Values
