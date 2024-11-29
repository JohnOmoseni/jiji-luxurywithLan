import { FormFieldType } from "@/components/forms/CustomFormField";
import { categoryFields } from "@/constants";
import { CategoryTypes } from "@/types/api.types";

export const handleApiError = (error: any, message?: string) => {
  console.error(`API Error - ${message}:`, error);
  if (error.response) {
    // Server returned a responnse not in the 200 range
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  } else if (error.request) {
    console.error("Request data:", error.request);
  } else {
    // No response from server - 404
    console.error("Error message:", error.message);
  }
  throw error;
};

export function getInitials(name?: string) {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export const truncateString = (str: string, length: number = 25): string => {
  return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Function to generate initial values for PostProperty
export const generateInitialValues = (
  categoryType: CategoryTypes | null,
  data?: any
): { [key: string]: any } => {
  // Dynamic fields based on category type, if any
  const dynamicFields = categoryFields[categoryType || ""]?.reduce((acc, field) => {
    acc[field.name] = field.type === FormFieldType.CHECKBOX ? false : "";
    return acc;
  }, {} as Record<string, any>);

  return {
    ...dynamicFields,
  };
};
