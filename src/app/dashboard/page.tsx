"use client";
import messages from "@/assets/messages/fa.json";
import Button from "@/components/ui/Button/Button";
import { clearLocalData, getLocalData } from "@/utils/common";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { INFORMATION_KEY } from "../auth/meta/constants";
import styles from "./Dashboard.module.scss";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  // we can get Data from useAuth too.
  // const { userData } = useAuth();

  useLayoutEffect(() => {
    const storedData = getLocalData(INFORMATION_KEY);

    if (!storedData?.id) {
      router.replace("/auth");
      return;
    }
    setName(storedData.name);
  }, []);

  const onExitHandler = useCallback(() => {
    clearLocalData();
    router.replace("/auth");
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <h2> {name || "کاربر"} به داشبورد خوش‌آمدید</h2>
        <Button onClick={onExitHandler}>{messages.exit}</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
