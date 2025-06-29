import Link from "next/link";
import styles from "./HomePage.module.scss";
import messages from "@/assets/messages/fa.json";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{messages["welcome-to-home-page"]}</h1>
        <Link href="/auth" className={styles.login}>
          {messages["login-page"]}
        </Link>
      </div>
    </div>
  );
}
