import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: string | number) => {
  if (!price) return 0;
  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(Number(price));
};

export const convertToTitleCase = (str: string) => {
  if (!str) return "";
  return str
    ?.split("_")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

export const formatRelativeTime = (date: any) => {
  if (!date) {
    return "Unknown";
  }

  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    return "Invalid date";
  }

  return parsedDate.fromNow();
};

export function createSearchParamsHelper(filters: any) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(", ");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}
