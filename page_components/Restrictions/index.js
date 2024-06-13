import React, { useState } from 'react'
import styles from "./styles.module.css"
import markerIcon from '@/public/icons/marker.svg'
import binIcon from '@/public/icons/bin.svg'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'

const DEFAULT_VALUES = [
    {
        title: "Profanity",
        description: "Don't use any profane, explicit or offensive language"
    },
    {
        title: "Discrimination",
        description: "Ensure that content does not discriminate based on demographic or ethnicity"
    }
]

function Restrictions() {
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
                RESTRICTIONS
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
                                <Image
                                    className={styles.remove_keyword_icon}
                                    src={binIcon}
                                    width={16}
                                    height={16}
                                />
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

export default Restrictions
