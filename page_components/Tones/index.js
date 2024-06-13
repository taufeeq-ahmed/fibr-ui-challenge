import React, { useState } from 'react'
import styles from "./styles.module.css"
import markerIcon from '@/public/icons/marker.svg'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'

const DEFAULT_VALUES = [
    {
        title: "Default Brand Tone",
        description: "Fibr's brand voice is professional and informative, focusing on clarity and precision. The content is written in a formal tone with a direct approach, using technical vocabulary that appeals to a professional audience. The language is concise, with a focus on readability and straightforward sentence structures.",
        keywords: ["Proffessionalism", "Informative", "Precision"]
    },
    {
        title: "Fibr",
        description: "The brand voice is warm and nurturing, characterized by a positive and caring tone. It blends a clear and concise style with an emphasis on ethical and sustainable practices, enhancing emotional appeal through a thoughtful mix of sentence structures.",
        keywords: ["Caring", "Trustworthiness", "Informative"]
    },
    {
        title: "Mamaearth",
        description: "The brand voice is warm and nurturing, characterized by an empathetic and trustworthy tone. It blends a clear and concise style with a touch of enthusiasm, enhancing engagement through a thoughtful mix of sentence structures.",
        keywords: ["Empathy", "Trustworthiness", "Enthusiasm"]
    },
    {
        title: "Lipton",
        description: "The brand voice is encouraging and informative, characterized by a supportive and authoritative tone. It blends a clear and concise style, enhancing engagement through a thoughtful mix of sentence structures.",
        keywords: ["Informative", "Supportive", "Authoritative"]
    },
    {
        title: "Spree",
        description: "The brand voice is warm and nurturing, characterized by an empathetic and trustworthy tone. It blends a clear and concise style with a touch of enthusiasm, enhancing engagement through a thoughtful mix of sentence structures.",
        keywords: ["Caring", "Informative", "Trustworthiness"]
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
            tones: formData,
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tones"
    })

    const handleAddValue = () => {
        append({ title: "", description: "" })
    }

    const onSubmit = (data) => {
        setFormData(data.tones)
        setMode("display")
    }

    const handleCancel = () => {
        setMode("display")
    }

    return (
        <div className={styles.tones}>
            <h3 className={styles.tones_heading}>
                TONES OF VOICE
            </h3>
            <p className={styles.tones_subheading}>
                Use different tones of voice to create custom content
            </p>

            {mode === "display" ? (
                <div className={styles.tones_list}>
                    {formData.map((tone, index) => (
                        <div key={index} className={styles.tone_item}>
                            <h4 className={styles.title}>{tone.title}</h4>
                            <p className={styles.description}>{tone.description}</p>
                            <div className={styles.keywords_container}>
                                {tone.keywords.map((k) => {
                                    return (
                                        <div className={styles.keyword}>
                                            {k}
                                        </div>
                                    )
                                })}
                            </div>
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
                    className={styles.tones_form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Button
                        colorScheme='#667bf6;'
                        variant='link'
                        onClick={handleAddValue}
                        className={styles.addtone_button}
                    >
                        + Add
                    </Button>
                    {fields.map((item, index) => (
                        <div key={item.id} className={styles.tone_input_item}>
                            <Input
                                type='text'
                                placeholder='Value'
                                {...register(`tones.${index}.title`)}
                                className={styles.input}
                            />
                            <Textarea
                                placeholder='Description'
                                rows={5}
                                {...register(`tones.${index}.description`)}
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
