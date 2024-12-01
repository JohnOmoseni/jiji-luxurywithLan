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
    icon: Car,
  },
  {
    label: "Vehicles",
    value: "Automobile",
    icon: Car,
  },
  {
    label: "Houses",
    value: "House Properties",
    icon: House,
  },
  {
    label: "Lands",
    value: "Land",
    icon: Property,
  },
  {
    label: "Hotels",
    value: "Hotel",
    icon: House,
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

export const listings = [
  {
    id: "1",
    type: "Property",
    image: "",
    title: "Ayana Home Stay",
    location: "Lagos, Ikeja",
    price: "120,000,000",
    tagColor: "blue",
  },

  {
    id: "2",
    type: "Automobile",
    image: "",
    title: "Ayana Home Stay",
    location: "Lagos, Ikeja",
    price: "120,000,000",
    tagColor: "green",
  },
  {
    id: "3",
    type: "Automobile",
    image: "",
    title: "Ayana Home Stay",
    location: "Lagos, Ikeja",
    price: "120,000,000",
    tagColor: "green",
  },
  {
    id: "4",
    type: "Land",
    image: "",
    title: "Ayana Home Stay",
    location: "Lagos, Ikeja",
    price: "120,000,000",
    tagColor: "green",
  },
  {
    id: "5",
    type: "Hotel",
    image: "",
    title: "Ayana Home Stay",
    location: "Lagos, Ikeja",
    price: "120,000,000",
    tagColor: "green",
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
  { label: "PortHarcourt", value: "portharcourt" },
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
  { value: "Land", label: "Land" },
  { value: "Property", label: "Apartment" },
  { value: "Automobile", label: "Automobile" },
  { value: "Hotels", label: "Hotel" },
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
