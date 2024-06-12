import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Button, Input } from '@chakra-ui/react';
import FilesInput from '@/components/FilesInput';
import { useForm } from 'react-hook-form';
import markerIcon from '@/public/icons/marker.svg';
import binIcon from '@/public/icons/bin.svg'
import BrandContent from './BrandContent';

function ImageGuides() {
    const fileInputRef = useRef(null);
    const [mode, setMode] = useState("display");


    const { register, handleSubmit, watch, setValue, trigger } = useForm();
    const watchedFiles = watch('imageFiles');
    const brandName = watch("brandName")

    const handleFilesInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        const existingFiles = watchedFiles || [];
        const newFiles = [...existingFiles, ...files];
        setValue('imageFiles', newFiles);
        trigger('imageFiles');
    };

    const handleCancel = () => {
        setMode("display");
    };



    const onSubmit = (data) => {
        const files = data.imageFiles;
        const parsedData = JSON.parse(localStorage.getItem("brandData"))

        if (!parsedData["imagesGuide"]) {
            parsedData["imagesGuide"] = []
        }
        console.log(parsedData)
        parsedData["imagesGuide"].push({
            brandName: data.brandName,
            files: files
        })

        localStorage.setItem("brandData", JSON.stringify(parsedData))
        setMode("display")
    };


    return (
        <div className={styles.image_guides}>
            <div className={styles.description}>
                <h3 className={styles.heading}>IMAGE GUIDES</h3>
                <p className={styles.paragraph}>
                    Add multiple images to guides to
                    train Fibr's model on your company's
                    brand guidelines
                </p>
            </div>

            <BrandContent
                images={watchedFiles}
                brandName={brandName}
            />

            {mode === "edit" && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className={styles.input}
                        placeholder='Ex: Portrait Guide'
                        size='lg'
                        {...register('brandName')}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        {...register('imageFiles')}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                    <FilesInput onClick={handleFilesInputClick} />
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
            {mode !== "edit" && (
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
            )}
        </div>
    );
}

export default ImageGuides;
