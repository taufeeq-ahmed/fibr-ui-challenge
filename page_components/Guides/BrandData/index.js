import React from "react"
import styles from "./styles.module.css"

function BrandData({ images = [], brandName }) {
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
            <h3>{brandName}</h3>
            <div className={styles.brand_images}>
                {brandImages}
            </div>
        </div>
    )
}

export default BrandData
