export type CategoryTypes = "Land" | "Property" | "Automobile" | "Hotel";

export interface FormValues {
  name: string;
  listingType: string;
  description: string;
  address: string;
  state: string;
  lga: string;
  district: string;
  amount: string;
  actual_amount: string;
  category: string;
  mediaImage: string;
  is_negotiable: boolean;
  [key: string]: any;
}

// AUTH
export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// PROFILE TYPES

export type GetProfileType = {
  id: 1;
  name: "Ms. Vesta Kassulke V";
  email: "test@gmail.com";
  phone: null;
  gender: null;
  badge: "normal";
  area: null;
  lga_id: null;
  lga_name: null;
  state_id: null;
  state_name: null;
  is_verified: true;
  profile_picture: null;
  created_at: "2024-11-18T16:51:59.000000Z";
};

export type UpdateProfileParams = {
  name: string;
  phone: string;
  alt_phone?: number;
  gender: "male" | "female";
  dob: string;
  area?: string;
  lga_id?: number;
  state_id?: number;
  badge?: number;
  profile_picture?: string;
};

export type UpdateProfilePasswordParams = {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
};

// BOOKINGS AND MARKET
export type BookItem = {
  customer_name: "Saka Balogun";
  phone: "07089787878";
  from_date: "2024-11-19";
  to_date: "2024-11-20";
  pickup_or_arrival_time: "10:30PM";
  email: "saka@gmail.com";
  payment_type: "pay_on_reach";
  persons: 2;
  customer_message: "Message";
  count: 1;
  data: [
    {
      key: "smoking";
      value: "yes";
    }
  ];
};

// COMPLAINTS
export type CreateComplaintParams = {
  titie: string;
  category_id: string;
  message: string;
  attachemnts: string[];
};

// MESSAGING
export type ChatProps = {
  chat_id?: string;
  type: "msg" | "error";
  message?: string;
  images?: string[];
  incoming?: boolean | string;
  outgoing?: boolean | string;
  timestamp?: number;
  error?: boolean;
  loading?: boolean;
};
