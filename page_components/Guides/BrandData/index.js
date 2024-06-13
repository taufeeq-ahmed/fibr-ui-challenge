import React from "react"
import styles from "./styles.module.css"
import Image from "next/image"
import binIcon from '@/public/icons/bin.svg'

function BrandData({ images = [], brandName, handleBrandDelete }) {
    const imageURLS = images.map(img => URL.createObjectURL(img))

    const brandImages = imageURLS.map((url) => (
        <div
            className={styles.brand_image}
            style={{
                backgroundImage: `url(${url})`,
            }}
        />
    ))

    while (brandImages.length !== 9) {
        brandImages.push(
            <div
                className={styles.brand_image}
                style={{
                    background: "#ebebeb",
                }}
            />
        )
    }

    return (
        <div className={styles.brand}>
            <div className={styles.left}>

                <div className={styles.brand_images}>
                    {brandImages}
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.information}>
                    <h3>{brandName}</h3>
                    <Image
                        src={binIcon}
                        width={20}
                        height={20}
                        onClick={() => handleBrandDelete(brandName)}
                    />
                </div>
                <ul className={styles.brand_themes}>
                    <li className={styles.theme}>
                        <div className={styles.theme_name}>
                            LIGHTHING
                        </div>
                        <div className={styles.theme_value}>
                            neon glow
                        </div>
                    </li>
                    <li className={styles.theme}>
                        <div className={styles.theme_name}>
                            TONES
                        </div>
                        <div className={styles.theme_value}>
                            vibrant, energetic
                        </div>
                    </li>
                    <li className={styles.theme}>
                        <div className={styles.theme_name}>
                            STYLES
                        </div>
                        <div className={styles.theme_value}>
                            neon, cyberpunk, digital art
                        </div>
                    </li>
                    <li className={styles.theme}>
                        <div className={styles.theme_name}>
                            PERSPECTIVES
                        </div>
                        <div className={styles.theme_value}>
                            eye-level
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BrandData
