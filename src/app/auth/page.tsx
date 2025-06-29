"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import messages from "@/assets/messages/fa.json";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useFetch } from "@/hooks/useFetch/useFetch";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { setLocalData } from "@/utils/common";
import { AUTH_ENDPOINTS, INFORMATION_KEY } from "./meta/constants";
import { Information } from "./meta/types";
import { informationParser, validateIranianPhoneNumber } from "./meta/utils";

import { useSnackbar } from "@/hooks/useSnackbar/useSnackbar";
import { cn } from "@/utils/classNames";
import { setToken } from "@/utils/serverActions/setToken";
import { USER_ID_TOKEN_NAME } from "../constants/constants";
import styles from "./Auth.module.scss";

const AuthPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const { setUserData } = useAuth();
  const display = useSnackbar();

  const { loading, fetchData } = useFetch<{ results: Information[] }>({
    url: AUTH_ENDPOINTS.get,
    immediatelyFetch: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const mobile = formData.get("mobile")?.toString().trim() ?? "";

    const { error, isValid } = validateIranianPhoneNumber(mobile);

    if (!isValid) {
      setValidationError(error);
      return;
    }

    try {
      const response = await fetchData();

      if (response?.results?.[0]) {
        persistUserData(response.results[0]);
        setToken(
          USER_ID_TOKEN_NAME,
          response.results[0].id?.value?.toString() ?? ""
        );
        display(messages["success-login"]);

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        setValidationError(messages["unexpected-error"]);
      }
    } catch (error) {
      setValidationError(messages["unexpected-error"]);
    }
  };

  const persistUserData = (info: Information) => {
    const parsed = informationParser(info);
    setUserData(parsed);
    setLocalData(INFORMATION_KEY, parsed);
  };

  const inputChangeHandler = (data: string) => {
    const { error } = validateIranianPhoneNumber(data);
    setValidationError(error);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h3 className={styles.login__title}>{messages["enter-system"]}</h3>

        <form className={styles.login__form} onSubmit={handleSubmit} noValidate>
          <div className={styles.login__form__inputWrapper}>
            <label
              htmlFor={"mobile"}
              className={styles.login__form__inputWrapper__label}
            >
              {messages["phone-number"]}
            </label>
            <Input
              autoComplete="tel"
              name="mobile"
              type="tel"
              onChange={inputChangeHandler}
              ref={inputRef}
              className={cn(
                validationError && styles.login__form__inputWrapper__not_valid
              )}
            />
            <p className={styles.login__form__inputWrapper__errorText}>
              {validationError}
            </p>
          </div>

          <Button
            type="submit"
            className={styles.login__form__submitBtn}
            loading={loading}
          >
            {loading ? <Loading /> : messages.enter}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
