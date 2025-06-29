"use client";
import messages from "@/assets/messages/fa.json";
import Button from "@/components/ui/Button/Button";
import { clearLocalData, getLocalData } from "@/utils/common";
import { RemoveToken } from "@/utils/serverActions/setToken";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { INFORMATION_KEY } from "../auth/meta/constants";
import { USER_ID_TOKEN_NAME } from "../constants/constants";
import styles from "./Dashboard.module.scss";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  // we can get Data from useAuth too.
  // const { userData } = useAuth();

  useLayoutEffect(() => {
    const storedData = getLocalData(INFORMATION_KEY);

    setName(storedData?.name);
  }, []);

  const onExitHandler = useCallback(() => {
    clearLocalData();
    RemoveToken(USER_ID_TOKEN_NAME);
    router.refresh();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <h2>
          {" "}
          {name || "کاربر"} {messages["welcome-to-dashboard"]}
        </h2>
        <Button onClick={onExitHandler}>{messages.exit}</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
