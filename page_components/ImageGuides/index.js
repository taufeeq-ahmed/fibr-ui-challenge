import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { Button, Input } from '@chakra-ui/react';
import FilesInput from '@/components/FilesInput';
import { useForm } from 'react-hook-form';
import markerIcon from '@/public/icons/marker.svg';

function ImageGuides() {
    const fileInputRef = useRef(null);
    const [mode, setMode] = useState("display");
    const [objectUrls, setObjectUrls] = useState([]);

    const { register, handleSubmit, watch, setValue, trigger } = useForm();
    const watchedFiles = watch('imageFiles');

    useEffect(() => {
        // Create object URLs for the files
        const newObjectUrls = (watchedFiles || []).map(file => URL.createObjectURL(file));
        setObjectUrls(newObjectUrls);

        // Cleanup object URLs when the component unmounts or watchedFiles change
        return () => {
            newObjectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [watchedFiles]);

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

    const handleSave = () => {
        // Implement save functionality
    };

    const onSubmit = (data) => {
        const files = data.imageFiles;
        if (files && files.length > 0) {
            console.log('Selected files:', files);
        } else {
            console.error('No files selected or files data is invalid.');
        }
    };

    const renderSelectedImages = (files) => {
        if (!files || files.length === 0) return null;

        const images = objectUrls.map((url, index) => (
            <div
                key={index}
                className={styles.image}
                style={{
                    backgroundImage: `url(${url})`,
                }}
            />
        ));
        while (images.length < 9) {
            images.push(
                <div
                    key={images.length}
                    className={styles.image}
                    style={{
                        background: "#ebebeb",
                    }}
                />
            )
        }
        return images
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
            <div className={styles.content}>
                <div className={styles.images}>
                    {renderSelectedImages(watchedFiles)}
                </div>
                <div className={styles.data}>
                    <h3 className={styles.brand_name}>
                        Cred Guide
                        <span>x</span>
                    </h3>
                    <ul className={styles.brand_details}>
                        <li className={styles.detail}>
                            <span className={styles.label}>
                                LIGHTINGS
                            </span>
                            <span className={styles.stuff}>
                                bright,contrasting
                            </span>
                        </li>
                        <li className={styles.detail}>
                            <span className={styles.label}>
                                LIGHTINGS
                            </span>
                            <span className={styles.stuff}>
                                bright,contrasting
                            </span>
                        </li>
                        <li className={styles.detail}>
                            <span className={styles.label}>
                                LIGHTINGS
                            </span>
                            <span className={styles.stuff}>
                                bright,contrasting
                            </span>
                        </li>
                        <li className={styles.detail}>
                            <span className={styles.label}>
                                LIGHTINGS
                            </span>
                            <span className={styles.stuff}>
                                bright,contrasting
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            {mode === "edit" && (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className={styles.input}
                        placeholder='Ex: Portrait Guide'
                        size='lg'
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
                            colorScheme='#667bf6'
                            variant='link'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme='#667bf6'
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
