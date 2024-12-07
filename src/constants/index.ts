import { FormFieldType } from "@/components/forms/CustomFormField";
import {
  Car,
  car_front,
  car_image,
  CarUsed,
  FuelGas,
  Gear,
  House,
  Instagram,
  List,
  Property,
  SpeedMeter,
  Twitter,
  Whatsapp,
} from "./icons";
import { DynamicFieldType, FilterOptionsType } from "@/types";
// import { Car } from "lucide-react";

export const routes = {
  ROOT: "/",
  LOGIN: "/signin",
  SIGNUP: "/signup",
  VERIFY_OTP: "/verify-otp",
  UNAUTH: "/unauthorized",
  DASHBOARD: "/dashboard",
  ADMIN_ROUTES: [""],
};

export const mainTabs = [
  {
    label: "All",
    value: "all",
    icon: List,
    id: "all",
  },
  {
    label: "Vehicles",
    value: "Automobile",
    icon: Car,
    id: "Automobile",
  },
  {
    label: "Houses",
    value: "House Properties",
    icon: House,
    id: "House Properties",
  },
  {
    label: "Lands",
    value: "Land",
    icon: Property,
    id: "Landed Properties",
  },
  {
    label: "Hotels",
    value: "Hotel",
    icon: House,
    id: "Hotel",
  },
];

export const socials = [
  {
    label: Instagram,
    href: "https://www.instagram.com/luxury.with.lan/profilecard/?igsh=MTh4MWl2d25hamZmMQ==",
    tag: "instagram",
  },
  {
    label: Twitter,
    href: "https://www.twitter.com/@luxurywithlan",
    tag: "facebook",
  },
  {
    label: Whatsapp,
    href: "https://wa.me/+2348074764296?text=Hello%20there!",
    tag: "chat",
  },
];

export const locations = ["Bayelsa", "Port Harcourt", "Lagos", "Abuja"];

export const faqs = [
  {
    label: "How do I contact Support Team",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
  {
    label: 'What happens after I click on "Post ad"?',
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
  {
    label: "What can I do to sell better?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
  {
    label: "Posting rules",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
  {
    label: "Price changes in March 2024",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
  {
    label: "How to leave feedback about the seller?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  },
];

export const vehicleCategories = [
  { label: "Cars", value: "cars" },
  { label: "Buses & Microbuses", value: "buses" },
  { label: "Heavy Equipment", value: "heavy_equipments" },
  { label: "Motorbikes", value: "motorbikes" },
];

export const locationCategories = [
  { label: "Abuja", value: "abuja" },
  { label: "Lagos", value: "lagos" },
  { label: "Port-Harcourt", value: "portharcourt" },
  { label: "Bayelsa", value: "bayelsa" },
];

const discountCategories = [
  { label: "With Discounts", value: "with_discounts" },
  { label: "Without Discounts", value: "without_discounts" },
];

const verifiedSellers = [
  { label: "Verified", value: "verified" },
  { label: "Unverified", value: "unverified" },
];

export const filterOptions: FilterOptionsType = {
  vehicles: vehicleCategories,
  location: locationCategories,
  discount: discountCategories,
  "verified Sellers": verifiedSellers,
};

export const sortOptions = [
  {
    value: "title-atoz",
    label: "Title: A to Z",
  },
  {
    value: "title-ztoa",
    label: "Title: Z to A",
  },
  {
    value: "price-highlow",
    label: "Price: High to Low",
  },
  {
    value: "price-lowhigh",
    label: "Price: Low to High",
  },
];

export const details = {
  name: "BMW 328i 2012 Black",
  location: "Abuja, Garki 2",
  mediaImages: [car_front, car_image, car_image, car_image, car_image],
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos et soluta exercitationem, vitae, veritatis itaque enim iure iusto pariatur dolorem voluptate mollitia laboriosam consequuntur expedita nulla eaque tempora placeat?",
  car_type: [
    {
      label: "Foreign Used",
      icon: CarUsed,
    },
    {
      label: "Petrol",
      icon: FuelGas,
    },
    {
      label: "Automatic",
      icon: Gear,
    },
    {
      label: "121345 km",
      icon: SpeedMeter,
    },
  ],
  info: [
    {
      label: "Second Condition",
      value: "New",
    },
    {
      label: "Make",
      value: "BMW",
    },
    {
      label: "Color",
      value: "Black",
    },
    {
      label: "Registered Car",
      value: "300",
    },
    {
      label: "Interior Color",
      value: "Black",
    },
    {
      label: "Year of Manufacture",
      value: "2018",
    },
  ],
};

export const categoryFields: Record<string, DynamicFieldType[]> = {
  Automobile: [
    { name: "make", label: "Make", type: FormFieldType.INPUT, placeholder: "e.g., Toyota" },
    { name: "model", label: "Model", type: FormFieldType.INPUT, placeholder: "e.g., Corolla" },
    {
      name: "year",
      label: "Year",
      type: FormFieldType.INPUT,
      inputType: "number",

      placeholder: "e.g., 2020",
    },
    {
      name: "mileage",
      label: "Mileage",
      type: FormFieldType.INPUT,
      inputType: "number",

      placeholder: "e.g., 12000",
    },
    {
      name: "fuel_type",
      label: "Fuel Type",
      type: FormFieldType.SELECT,
      placeholder: "",
      options: [
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "electric", label: "Electric" },
      ],
    },
    {
      name: "transmission",
      label: "Transmission",
      type: FormFieldType.SELECT,
      placeholder: "",
      options: [
        { value: "automatic", label: "Automatic" },
        { value: "manual", label: "Manual" },
      ],
    },
    { name: "color", label: "Color", type: FormFieldType.INPUT, placeholder: "e.g., Red" },
    {
      name: "engine_capacity",
      label: "Engine Capacity",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 2000cc",
    },
    {
      name: "doors",
      label: "Doors",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 4",
      inputType: "number",
    },
    {
      name: "seats",
      label: "Seats",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 5",
      inputType: "number",
    },
    {
      name: "interior_color",
      label: "Interior Color",
      type: FormFieldType.INPUT,
      placeholder: "e.g., Black",
    },
    {
      name: "car_type",
      label: "Car Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "truck", label: "Truck" },
      ],
    },
    {
      name: "body_type",
      label: "Body Type",
      type: FormFieldType.INPUT,
      placeholder: "e.g., Coupe",
    },
    {
      name: "fuel_efficiency",
      label: "Fuel Efficiency",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 15 km/l",
    },
    {
      name: "air_conditioning",
      label: "Air Conditioning",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    {
      name: "power_steering",
      label: "Power Steering",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
  ],
  Property: [
    {
      name: "bedrooms",
      label: "Bedrooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 3",
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 2",
    },
    {
      name: "kitchens",
      label: "Kitchens",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "garages",
      label: "Garages",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "living_rooms",
      label: "Living Rooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "floor_area",
      label: "Floor Area (sq ft)",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1500",
    },
    {
      name: "property_type",
      label: "Property Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "house", label: "House" },
        { value: "apartment", label: "Apartment" },
      ],
    },
    {
      name: "property_status",
      label: "Property Status",
      type: FormFieldType.SELECT,
      options: [
        { value: "for_sale", label: "For Sale" },
        { value: "for_rent", label: "For Rent" },
      ],
    },
    {
      name: "is_fully_equipped",
      label: "Fully Equipped",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    { name: "has_garden", label: "Garden", type: FormFieldType.CHECKBOX, placeholder: "" },
    {
      name: "has_swimming_pool",
      label: "Swimming Pool",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    {
      name: "has_laundry_facility",
      label: "Laundry Facility",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    { name: "has_internet", label: "Internet", type: FormFieldType.CHECKBOX, placeholder: "" },
    {
      name: "has_security_house",
      label: "Security House",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
  ],
  Land: [
    {
      name: "land_type",
      label: "Land Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "agricultural", label: "Agricultural" },
        { value: "industrial", label: "Industrial" },
        { value: "mixed_use", label: "Mixed Use" },
        { value: "open", label: "Open" },
      ],
    },
    {
      name: "land_size",
      label: "Land Size (sq ft)",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 5000",
    },
    {
      name: "land_purpose",
      label: "Land Purpose",
      type: FormFieldType.SELECT,
      options: [
        { value: "sale", label: "For Sale" },
        { value: "lease", label: "For Lease" },
        { value: "development", label: "For Development" },
      ],
    },
    {
      name: "land_status",
      label: "Land Status",
      type: FormFieldType.SELECT,
      options: [
        { value: "developed", label: "Developed" },
        { value: "under_developed", label: "Under Developed" },
        { value: "freehold", label: "Freehold" },
        { value: "emcumbered", label: "Emcumbered" },
      ],
    },
    {
      name: "is_leased",
      label: "Is Leased",
      type: FormFieldType.CHECKBOX,
    },
  ],
  // Other categories
};

export const mainCategories = [
  { value: "Land", label: "Land", id: "1" },
  { value: "Property", label: "Apartment", id: "12" },
  { value: "Automobile", label: "Automobile", id: "23" },
  { value: "Hotels", label: "Hotel", id: "34" },
];

export const listingTypes = [
  {
    label: "Sale",
    value: "sale",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Hire",
    value: "hire",
  },
  {
    label: "Shortlet",
    value: "shortlet",
  },
  {
    label: "Lease",
    value: "lease",
  },
];

export const leasedFields = [
  {
    name: "leased_duration",
    label: "Lease Duration (months)",
    type: FormFieldType.INPUT,
    inputType: "number",
    placeholder: "e.g., 12",
  },
  {
    name: "leased_price",
    label: "Leased Price",
    type: FormFieldType.INPUT,
    inputType: "number",
    placeholder: "e.g., 5000",
  },
];

export const privacyPolicy = [
  {
    introduction:
      "LuxuryWithLan values the privacy of its users. This Privacy Policy describes how we collect, use, and protect the personal information of users who interact with our app, website, and services. \n By using our platform, you agree to the practices outlined in this Privacy Policy.",
  },
  {
    label: "Information we collect",
    body: "Personal Information: When you register or use our app, we may collect personal information such as your name, email address, phone number, location, payment details, and any other information you provide during registration or transactions.\n \n  Property Listings Information: If you list a property, car, apartment, or hotel, we may collect details such as the property type, address, photos, price, and other relevant information. \n \n Usage Data: We may collect information about how you use the app, such as device information, IP address, browser type, browsing history, search queries, and the features you use. \n \n  Location Data: We may collect your device's location to provide location-based services (e.g., nearby properties or listings.",
  },
  {
    label: "How we use Information",
    body: "We use the collected information for the following purposes: \n \n To provide, improve, and personalize our services. \n \n To process transactions, manage listings, and facilitate communication between buyers and sellers. \n \n  To send marketing and promotional communications (if you have opted in). \n \n  To improve the functionality of the app and monitor usage patterns. \n \n  To comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    label: "Sharing Your Information",
    body: "We may share your information with third parties in the following circumstances: \n \n Service Providers: We may share your information with trusted third-party service providers who assist with operations such as payment processing, hosting, and marketing. \n \n Legal Requirements: We may disclose your information if required to do so by law, regulation, legal process, or governmental request. \n \n Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.",
  },
  {
    label: "Data Security",
    body: "We take reasonable steps to protect your personal data from unauthorized access, loss, or misuse. \n However, no method of data transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.",
  },

  {
    label: "User Rights and Control",
    body: "As a user, you have the following rights: \n \n Access: YYou may access, review, and update your personal information through your account settings. \n \n Opt-Out: You may opt-out of receiving marketing communications by following the unsubscribe instructions in any communication or adjusting your notification preferences in the app. \n \n Data Deletion: You may request the deletion of your account and personal information, subject to applicable legal obligations and retention periods.",
  },

  {
    label: "Cookies and Tracking Technologies",
    body: "We use cookies and other tracking technologies to enhance your user experience. You can disable cookies through your browser settings, but this may affect your ability to use certain features of the app.",
  },
  {
    label: "Third-Party Links",
    body: "Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.",
  },
  {
    label: "Changes to this Privacy Policy",
    body: 'We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we will update the "Effective Date" at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.',
  },
  {
    label: "Contact Us",
    body: "If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at: skymeasure@gmail.com",
  },
];
