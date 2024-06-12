import React, { useState } from 'react'
import styles from "./styles.module.css"
import plusIcon from '@/public/icons/plus.svg';
import Image from 'next/image';
import { SketchPicker } from "react-color";

const DEFAULT_COLORS = [
    "#8A2828",
    "#AA42FF",
    "#341D1D"
]

function Colors() {
    const [colors, setColors] = useState(DEFAULT_COLORS)
    const [clickedColor, setClickedColor] = useState(null)

    const handleAddColor = () => {
        setColors(prev => [...prev, "#000"])
    }

    const handleColorClick = (e, itemNumber) => {
        e.stopPropagation();
        setClickedColor(itemNumber)
    }

    const handleCloseColorPicker = () => {
        setClickedColor(null)
    }

    return (
        <div className={styles.colors}
            onClick={handleCloseColorPicker}
        >
            <h3 className={styles.colors_heading}>
                COLORS
            </h3>
            <div className={styles.color_palette}>
                {colors.map((color, i) => {
                    return (
                        <div className={styles.color_container}>
                            <div
                                className={styles.color}
                                style={{
                                    backgroundColor: color
                                }}
                                onClick={(e) => handleColorClick(e, i)}
                            >
                                <div
                                    className={styles.color_picker}
                                    style={{
                                        display: clickedColor === i ? "block" : "none",
                                    }}
                                >
                                    <SketchPicker
                                        onChange={(color) => {
                                            const newColors = [...colors]
                                            newColors[i] = color.hex
                                            setColors(newColors)
                                        }}
                                        color={color}
                                    />
                                </div>
                            </div>

                            <p className={styles.color_text}>{color}</p>

                        </div>

                    )
                })}
            </div>
            <div
                className={styles.edit_control}
                onClick={handleAddColor}
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
        </div>
    )
}

export default Colors