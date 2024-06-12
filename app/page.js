"use client";

import styles from "./page.module.css";
import Header from "@/components/Header";
import BasicDetails from "@/page_components/BasicDetails";
import ImageGuides from "@/page_components/ImageGuides";
import Logos from "@/page_components/Logos";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.details}>
        <div className={styles.detail_card}>
          <BasicDetails />
        </div>
        <div className={styles.detail_card}>
          <Logos />
        </div>
        {/* <div className={styles.detail_card}>
          <ImageGuides />
        </div> */}
      </div>
    </main>
  );
}
