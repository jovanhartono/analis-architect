// src/globals/CompanyInfo.ts
import { GlobalConfig } from "payload";

const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  label: "Company Info",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
    },
    {
      name: "contactEmail",
      label: "Contact Email",
      type: "email",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
    },
    {
      name: "logo",
      label: "Company Logo",
      type: "upload",
      relationTo: "media", // or your upload collection
    },
  ],
};

export default CompanyInfo;
