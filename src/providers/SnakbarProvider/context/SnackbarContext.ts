"use client";
import { createContext } from "react";
import { SnackbarContextType } from "../meta/types";

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);
