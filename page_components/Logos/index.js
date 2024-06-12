import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import plusIcon from '@/public/icons/plus.svg';
import Image from 'next/image';

function Logos() {
    const { register, handleSubmit, watch, setValue, trigger } = useForm();
    const fileInputRef = useRef(null);
    const watchedFiles = watch('logoFiles');

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        const existingFiles = watchedFiles || [];
        const newFiles = [...existingFiles, ...files];
        setValue('logoFiles', newFiles);
        trigger('logoFiles');
    };

    const onSubmit = (data) => {
        const files = data.logoFiles;
        if (files && files.length > 0) {
            console.log('Selected files:', files);
        } else {
            console.error('No files selected or files data is invalid.');
        }
    };

    const renderSelectedImages = (files) => {
        if (!files || files.length === 0) return null;

        return Array.from(files).map((file, index) => (

            <Image
                src={URL.createObjectURL(file)}
                height={60}
                width={60}
                key={index}
                alt={`Selected logo ${index + 1}`}
                className={styles.logo_image}
            />

        ));
    };

    return (
        <div className={styles.logo_details}>
            <h3 className={styles.logos_heading}>
                LOGOS
            </h3>
            <div className={styles.selected_logos}>
                {renderSelectedImages(watchedFiles)}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="file"
                    accept="image/*"
                    {...register('logoFiles')}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                />
                <div
                    className={styles.edit_control}
                    onClick={handleButtonClick}
                >
                    <span className={styles.edit_icon_container}>
                        <Image
                            className={styles.edit_icon}
                            src={plusIcon}
                            width={13}
                            height={13}
                            alt="Add Icon"
                        />
                    </span>
                    <span>Add</span>
                </div>
                <button
                    type="submit"
                    style={{ display: 'none' }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Logos;
