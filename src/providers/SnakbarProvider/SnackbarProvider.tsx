"use client";
import { useCallback, useState } from "react";
import { SnackbarContext } from "./context/SnackbarContext";

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const display = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, []);

  return (
    <SnackbarContext.Provider value={{ display }}>
      {children}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
