export const projectCreationForm = [
  { variant: "outlined", type: "text", label: "Client Name", name: "name", placeholder: "John", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "text", label: "Email", name: "email", placeholder: "email", size: "medium", fullWidth: true, field: "input", required: true, },
  {
    variant: "outlined", type: "number", label: "Phone Number", name: "phone", placeholder: "E.g 03001234567", size: "medium", fullWidth: true, field: "input",
    validate: { regex: /^[+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/im, errorMessage: "Please provide valid Phone Number" },
    required: true
  },
  { variant: "outlined", type: "text", label: "Company", name: "company", placeholder: "company", size: "medium", fullWidth: true, field: "select", required: true, multiple: false, },
  { variant: "outlined", type: "text", label: "Location", name: "location", data: [{ label: "Location A" }, { label: "Location B" }], placeholder: "location", size: "medium", fullWidth: true, field: "select", required: true, },
  { variant: "outlined", type: "text", label: "Timezone", name: "timezone", placeholder: "timeZone", data: [{ label: "Western" }, { label: "Eastern" }, { label: "Local" }], size: "medium", fullWidth: true, field: "select", required: true, multiple: false, },
  { variant: "outlined", type: "text", label: "Communication", name: "communication", placeholder: "E.g Slack", size: "medium", fullWidth: true, field: "input", required: true, multiple: false, },
  { variant: "outlined", type: "text", label: "Profile", name: "profile", placeholder: "profile", size: "medium", fullWidth: true, field: "input", required: true, },
  { variant: "outlined", type: "text", label: "Billing Cycle", name: "billingCycle", placeholder: "billing cycle", data: [{ label: "Weekly" }, { label: "Biweekly" }, { label: "Monthly" }], size: "medium", fullWidth: true, field: "select", required: true, multiple: false, },
  { variant: "outlined", type: "text", label: "Billing Mode", name: "billingMode", placeholder: "billing mode", data: [{ label: "Weekly" }, { label: "Biweekly" }, { label: "Monthly" }], size: "medium", fullWidth: true, field: "select", required: true, multiple: false, },
  { variant: "outlined", type: "date", label: "Next Invoice Date", name: "nextInvoiceDate", size: "medium", fullWidth: true, field: "input", required: true, },
  { variant: "outlined", type: "text", label: "Relocation", name: "relocation", placeholder: "relocation", data: [{ label: "Yes" }, { label: "No" }], size: "medium", fullWidth: true, field: "select", required: true, },
  { variant: "outlined", type: "text", label: "Remote", name: "remote", placeholder: "remote", data: [{ label: "Yes" }, { label: "No" }], size: "medium", fullWidth: true, field: "select", required: true, },
];