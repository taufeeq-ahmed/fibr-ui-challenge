import React, { useState } from 'react';
import styles from "./styles.module.css";
import markerIcon from '@/public/icons/marker.svg';
import binIcon from '@/public/icons/bin.svg';
import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, AccordionIcon, Button, Input, Textarea } from '@chakra-ui/react';

const DEFAULT_VALUES = [
    {
        title: "Default Brand Tone",
        description: "Fibr's brand voice is professional and informative, focusing on clarity and precision. The content is written in a formal tone with a direct approach, using technical vocabulary that appeals to a professional audience. The language is concise, with a focus on readability and straightforward sentence structures.",
        keywords: [
            { value: "Professionalism", description: "Demonstrates a high level of professionalism" },
            { value: "Informative", description: "Provides valuable and informative content" },
            { value: "Precision", description: "Ensures accuracy and precision in the information" }
        ]
    },
    {
        title: "Fibr",
        description: "The brand voice is warm and nurturing, characterized by a positive and caring tone. It blends a clear and concise style with an emphasis on ethical and sustainable practices, enhancing emotional appeal through a thoughtful mix of sentence structures.",
        keywords: [
            { value: "Caring", description: "Shows a caring attitude towards customers" },
            { value: "Trustworthiness", description: "Builds trust with reliable information" },
            { value: "Informative", description: "Shares informative and useful content" }
        ]
    },
    {
        title: "Mamaearth",
        description: "The brand voice is warm and nurturing, characterized by an empathetic and trustworthy tone. It blends a clear and concise style with a touch of enthusiasm, enhancing engagement through a thoughtful mix of sentence structures.",
        keywords: [
            { value: "Empathy", description: "Shows a caring attitude towards customers" },
            { value: "Trustworthiness", description: "Builds trust with reliable information" },
            { value: "Enthusiasm", description: "Shares informative and useful content" }
        ]
    },
    {
        title: "Lipton",
        description: "The brand voice is encouraging and informative, characterized by a supportive and authoritative tone. It blends a clear and concise style, enhancing engagement through a thoughtful mix of sentence structures.",
        keywords: [
            { value: "Informative", description: "Shows a caring attitude towards customers" },
            { value: "Supportive", description: "Builds trust with reliable information" },
            { value: "Authoritative", description: "Shares informative and useful content" }
        ]
    },
    {
        title: "Spree",
        description: "The brand voice is caring and informative, characterized by a warm and reassuring tone. It blends a clear and concise style with an emphasis on quality and trustworthiness, enhancing readability and emotional appeal through a thoughtful mix of sentence structures.",
        keywords: [
            { value: "Caring", description: "Shows a caring attitude towards customers" },
            { value: "Informative", description: "Builds trust with reliable information" },
            { value: "Trustworthiness", description: "Shares informative and useful content" }
        ]
    },
];

function ToneForm({ control, register, index, remove }) {
    const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
        control,
        name: `tones.${index}.keywords`
    });

    return (
        <div className={styles.tone_input_item}>
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
            <div className={styles.keywords_section}>
                {keywordFields.map((keyword, kIndex) => (
                    <div key={keyword.id} className={styles.keyword_input_item}>
                        <Input
                            type='text'
                            placeholder='Keyword'
                            {...register(`tones.${index}.keywords.${kIndex}.value`)}
                            className={styles.input}
                        />
                        <Textarea
                            placeholder='Keyword Description'
                            rows={3}
                            {...register(`tones.${index}.keywords.${kIndex}.description`)}
                            className={styles.textarea_input}
                        />
                        <Button
                            colorScheme='red'
                            variant='link'
                            onClick={() => removeKeyword(kIndex)}
                            className={styles.remove_keyword}
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
                <Button
                    colorScheme='#667bf6'
                    variant='link'
                    onClick={() => appendKeyword({ value: "", description: "" })}
                    className={styles.add_keyword_button}
                >
                    + Add Value
                </Button>
            </div>
            <Button
                color={"##111111"}
                variant='link'
                onClick={() => remove(index)}
                className={styles.remove_button}
            >
                <Image
                    className={styles.remove_icon}
                    src={binIcon}
                    width={20}
                    height={20}
                />
            </Button>
        </div>
    );
}

function Values() {
    const [mode, setMode] = useState("display");
    const [formData, setFormData] = useState(DEFAULT_VALUES);

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
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tones"
    });

    const handleAddValue = () => {
        append({ title: "", description: "", keywords: [{ value: "", description: "" }] });
    };

    const onSubmit = (data) => {
        setFormData(data.tones);
        setMode("display");
    };

    const handleCancel = () => {
        setMode("display");
    };

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
                    <Accordion>
                        {formData.map((tone, index) => (
                            <AccordionItem key={index}>

                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <h2 className={styles.tone_heading}>
                                            {tone.title}
                                        </h2>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <p className={styles.description}>{tone.description}</p>
                                </AccordionPanel>
                                <div className={styles.keywords_container}>
                                    {tone.keywords.map((k, i) => (
                                        <div key={i} className={styles.keyword}>
                                            {k.value}
                                        </div>
                                    ))}
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
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
                        colorScheme='#667bf6'
                        variant='link'
                        onClick={handleAddValue}
                        className={styles.addtone_button}
                    >
                        + Add
                    </Button>
                    {fields.map((item, index) => (
                        <ToneForm
                            key={item.id}
                            control={control}
                            register={register}
                            index={index}
                            remove={remove}
                        />
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
    );
}

export default Values;
