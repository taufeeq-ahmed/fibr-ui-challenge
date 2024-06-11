import React from 'react'
import styles from "./sidebar.module.css"
import logo from '@/public/fibr_logo.svg'
import magicIcon from '@/public/magic.svg'
import experimentIcon from '@/public/experiment.svg'
import brandsIcon from '@/public/brands.svg'
import settingsIcon from '@/public/settings.svg'

import Image from 'next/image'
const SIDEBAR_ITEMS = [
  { icon: magicIcon, text: 'Ai Blocks' },
  { icon: experimentIcon, text: 'Web Pilot' },
  { icon: brandsIcon, text: 'Brand Hub' },
  { icon: settingsIcon, text: 'Settings' },
]

function SidebarItem({ icon, text }) {
  return (
    <li
      className={
        `${styles.tool} ${text === 'Brand Hub' && styles.active_tool} `
      }
    >
      <Image
        src={icon}
        width={24}
        height={24}
        className={styles.sidebar_icon}
      />
      {text}
    </li>
  )
}

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Image
        className={styles.logo}
        src={logo}
        width={96}
        layout='intrinsic'
      />
      <ul className={styles.tools}>
        {SIDEBAR_ITEMS.map((item) => {
          return (
            <SidebarItem
              icon={item.icon}
              text={item.text}
              key={item.text}
            />
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
