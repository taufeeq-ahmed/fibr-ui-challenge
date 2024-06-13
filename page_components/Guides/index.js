import React, { useRef, useState } from 'react';
import styles from "./styles.module.css"
import { Button, Input } from '@chakra-ui/react'
import FilesInput from '@/components/FilesInput'
import { useForm } from 'react-hook-form';
import plusIcon from '@/public/icons/plus.svg'
import Image from 'next/image';
import BrandData from './BrandData';

const DEFAULT_BRANDS = [
    {
        brandName: "Cred",
        images: [

        ]
    },
    {
        brandName: "Myntra",
        images: [

        ]
    }
]

function Guides() {
    const [brands, setBrands] = useState(DEFAULT_BRANDS)

    const [mode, setMode] = useState("display");
    const { register, handleSubmit, watch, setValue, trigger } = useForm();

    const watchedFiles = watch('imageFiles');

    const fileInputRef = useRef(null);

    const handleFilesInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCancel = () => {
        setMode("display");
    };

    const handleFileChange = (e) => {
        const files = event.target.files;
        const existingFiles = watchedFiles || [];
        const newFiles = [...existingFiles, ...files];
        setValue('imageFiles', newFiles);
        trigger('imageFiles');
    };

    const handleBrandDelete = (brandName) => {
        const updatedBrands = brands.filter(br => br.brandName !== brandName)
        setBrands(updatedBrands)
    }

    const onSubmit = (data) => {
        const { brandName, imageFiles: images } = data
        const updatedBrands = [...brands]
        updatedBrands.push({
            brandName,
            images
        })
        setBrands(updatedBrands)
        setMode("display")
    }

    return (
        <div className={styles.guides}>
            <h3 className={styles.guides_heading}>
                IMAGE GUIDES
            </h3>
            <p className={styles.guides_subheading}>
                Add multiple images to guides to train Fibr’s model on your company’s brand guidelines
            </p>
            <div className={styles.brands}>
                {brands?.map((brand) => {
                    return (
                        <BrandData
                            images={brand.images}
                            brandName={brand.brandName}
                            handleBrandDelete={handleBrandDelete}
                        />
                    )
                })}
            </div>
            {mode === "create" && (
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
                    onClick={() => { setMode("create") }}
                >
                    <span className={styles.edit_icon_container}>
                        <Image
                            className={styles.edit_icon}
                            src={plusIcon}
                            width={13}
                            height={13}
                        />
                    </span>
                    <span>Add</span>
                </div>
            )}
        </div>
    )
}

export default Guides;
