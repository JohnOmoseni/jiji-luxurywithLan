import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { FormFieldType } from "@/components/forms/CustomFormField";

export const APP_ROLES = {
  Admin: "ADMIN",
  User: "USER",
  Staff: "STAFF",
};

export type Status =
  | "Success"
  | "Approved"
  | "Verified"
  | "Not Verified"
  | "Active"
  | "Deactivated"
  | "Declined"
  | "Published"
  | "Unpublished";

export type ROLE = "ADMIN" | "STAFF" | "USER";

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  image: string;

  otpVerified: boolean;
  role: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

export type SidebarLinksProp = {
  icon: any;
  label: string;
  href: string;
  tag?: string;
  idx?: number;
};

export type TabsPanelProp = {
  activeTab: number;
  id: string;
  idx: number;
  children: React.ReactNode;
};

export type TabsProps = {
  activeTab: number;
  changeTab: (idx: number) => void;
  tabIDs: string[];
};

export type TabProps = {
  idx: number;
  activeTab: number;
  tab: string;
  changeTab: (idx: number) => void;
  className?: string;
};

export type DynamicFieldType = {
  name: string;
  label: string;
  type: FormFieldType;
  inputType?: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
};

export type FilterOptionsType = {
  [key: string]: { label: string; value: string }[];
};

export type FiltersType = {
  [key: string]: string[];
};

export type OptionType = {
  label: string;
  value: string;
};

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
