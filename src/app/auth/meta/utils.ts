import { mobileRegex } from "./constants";
import { Information, LocalUserData } from "./types";

export const informationParser = (data: Information): LocalUserData => {
  const id = data?.id?.value ?? "";
  const email = data?.email ?? "";
  const firstName = data?.name?.first ?? "";
  const lastName = data?.name?.last ?? "";

  const name = `${firstName} ${lastName}`.trim();

  return {
    id,
    email,
    name,
  };
};

export const convertPersianToEnglishDigits = (input: string): string => {
  return input.replace(/[\u06F0-\u06F9]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) - 1728)
  );
};

interface PhoneValidationResult {
  isValid: boolean;
  error: string;
}

export const validateIranianPhoneNumber = (
  input: string
): PhoneValidationResult => {
  const value = convertPersianToEnglishDigits(input).trim();

  switch (true) {
    case value === "":
      return { isValid: false, error: "شماره موبایل الزامی است" };
    case value.length < 11:
      return { isValid: false, error: "شماره موبایل باید ۱۱ رقم باشد." };

    case value.length > 11:
      return {
        isValid: false,
        error: "شماره موبایل نباید بیشتر از ۱۱ رقم باشد.",
      };

    case !mobileRegex.test(value):
      return { isValid: false, error: "فرمت شماره موبایل معتبر نیست." };

    default:
      return { isValid: true, error: "" };
  }
};
