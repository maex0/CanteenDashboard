import styles from "./page.module.css";

/**
 * @returns home page
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Cats</h1>
      </div>
    </main>
  );
}
