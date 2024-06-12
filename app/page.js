"use client";

import styles from "./page.module.css";
import Header from "@/components/Header";
import BasicDetails from "@/page_components/BasicDetails";
import Colors from "@/page_components/Colors";
import ImageGuides from "@/page_components/ImageGuides";
import Logos from "@/page_components/Logos";
import NegativeKeywords from "@/page_components/NegativeKeywords";
import Restrictions from "@/page_components/Restrictions";

import Values from "@/page_components/Values";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.details}>
        <div className={styles.detail_card}>
          <BasicDetails />
        </div>
        <div className={styles.detail_card}>
          <Values />
        </div>
        <div className={styles.detail_card}>
          <Logos />
        </div>
        <div className={styles.detail_card}>
          <Colors />
        </div>
        <div className={styles.detail_card}>
          <Restrictions />
        </div>
        {/* <div className={styles.detail_card}>
          <ImageGuides />
        </div> */}
        <div className={styles.detail_card}>
          <NegativeKeywords />
        </div>

      </div>
    </main>
  );
}
