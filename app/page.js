import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";
import Header from "@/components/Header";
import BasicDetails from "@/page_components/BasicDetails";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.details}>
        <div className={styles.detail_card}>
          <BasicDetails
            title={"Fibr"}
            description={"Fibr is an AI-driven platform that leverages artificial intelligence to optimize business processes, enhance data analytics, and automate tasks to improve efficiency and decision-making."}
          />
        </div>
      </div>
    </main>
  );
}
