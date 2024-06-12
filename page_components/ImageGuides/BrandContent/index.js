import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import binIcon from "@/public/icons/bin.svg"
import Image from 'next/image'

function BrandContent({ images, brandName }) {
    const [objectUrls, setObjectUrls] = useState([]);

    useEffect(() => {
        const newObjectUrls = (images || []).map(file => URL.createObjectURL(file));
        setObjectUrls(newObjectUrls);

        return () => {
            newObjectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

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

    if (!images || images?.length === 0) {
        return null
    }

    return (
        <div className={styles.content}>
            <div className={styles.images}>
                {renderSelectedImages(images)}
            </div>
            <div className={styles.data}>
                <h3 className={styles.brand_name}>
                    {brandName}
                </h3>
                <div className={styles.bin_container}>
                    <Image
                        className={styles.bin_icon}
                        src={binIcon}
                        width={18}
                        height={18}
                    />
                </div>
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
                            TONES
                        </span>
                        <span className={styles.stuff}>
                            vibrant, energetic
                        </span>
                    </li>
                    <li className={styles.detail}>
                        <span className={styles.label}>
                            STYLES
                        </span>
                        <span className={styles.stuff}>
                            neon, cyberpunk, digital art
                        </span>
                    </li>
                    <li className={styles.detail}>
                        <span className={styles.label}>
                            PERSPECTIVES
                        </span>
                        <span className={styles.stuff}>
                            eye-level
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BrandContent