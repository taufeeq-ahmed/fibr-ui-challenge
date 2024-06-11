import React from 'react'
import styles from './header.module.css'
import Image from 'next/image'
import guideIcon from '@/public/icons/guide.svg'
import settingsIcon from '@/public/icons/settings.svg'

function Header() {
    return (
        <header className={styles.header}>
            <Image
                src={guideIcon}
                width={24}
                height={24}
            />
            <div className={styles.heading}>
                <h3 className={styles.heading_name}>
                    Brand Guidelines
                </h3>
                <p className={styles.heading_description}>
                    Train Fibr’s AI model with your brand guidelines, and generate on-brand content — always
                </p>
            </div>
        </header>
    )
}

export default Header