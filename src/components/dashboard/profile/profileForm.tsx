import { bloodGroups, countries, employeeStatus, gender, maritalStatus, PayPeriod, PayType, techStack } from '../../common/commondata'

export const generalDetails = [
  { variant: "outlined", type: "text", label: "Full Name", name: "fullName", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "text", label: "Father Name", name: "fatherName", placeholder: "E.g Michael doe", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "email", label: "Email", name: "email", pattern: ".+@tutsplus.com|.+@envato.com", placeholder: "E.g John@test.com", size: "medium", fullWidth: true, field: "input", required: true, },
  { variant: "outlined", type: "number", label: "Phone Number", name: "phoneNo", placeholder: "E.g 03001234567", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/im, errorMessage: "Please provide valid Phone Number" }, required: true },
  { variant: "outlined", type: "number", label: "Emergency contact", name: "emergencyContact", placeholder: "E.g 03451234567", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/im, errorMessage: "Please provide valid Cell Number" }, required: true },
  { variant: "outlined", type: "text", label: "CNIC", name: "cnic", placeholder: "E.g 61101-1234567-9", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/, errorMessage: "Please provide valid CNIC" }, required: true },
  { variant: "outlined", label: "Gender", name: "gender", data: gender, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", label: "Marital Status", name: "maritalStatus", data: maritalStatus, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "date", label: "DOB", name: "dateOfBirth", placeholder: "E.g 23-5-1990", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", label: "Blood Group", name: "bloodGroup", data: bloodGroups, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "text", label: "Current Address", name: "currentAddress", placeholder: "E.g Street 1, sector B, city, country", size: "medium", fullWidth: true, multiline: true, rows: 1, field: "input", required: true },
  { variant: "outlined", type: "text", label: "Permanent Address", name: "permanentAddress", placeholder: "E.g Street 1, sector B, city, country", size: "medium", fullWidth: true, multiline: true, rows: 1, field: "input", required: true },
]

export const employeeDetails = [
  { variant: "outlined", type: "number", label: "Employee Code", name: "employeeCode", placeholder: "E.g 1234", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "number", label: "Employee Reader ID", name: "ReaderID", placeholder: "E.g 1234", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", label: "Company", name: "company", placeholder: "E.g Cloudtek", size: "medium", fullWidth: true, field: "select", multiple: false, required: false },
  { variant: "outlined", label: "Department", name: "department", size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "text", label: "Designation", name: "designation", size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", label: "Supervisor", name: "supervisor", size: "medium", fullWidth: true, field: "Select", multiple: false, required: false },
  { variant: "outlined", label: "Office Shift", name: "shift", data: [{ label: "Morning" }, { label: "Evening" }], size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", label: "Employee status", name: "employeeStatus", data: employeeStatus, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "text", label: "Report to", name: "reportTo", placeholder: "COO", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", label: "Tech stack", name: "techStack", data: techStack, size: "medium", fullWidth: true, field: "select", multiple: true, required: false },
  { variant: "outlined", type: "number", label: "Salary", name: "salary", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", label: "Pay Scale", name: "payScale", size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", label: "Pay Period", name: "payPeriod", data: PayPeriod, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", label: "Pay Type", name: "payType", data: PayType, size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "number", label: "Pay Rate", name: "payRate", placeholder: "E.g 400", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", label: "Pay Currency", name: "payCurrency", data: [{ label: "USD" }, { label: "PKR" }], size: "medium", fullWidth: true, field: "select", multiple: false, required: true },
  { variant: "outlined", type: "date", label: "Joining Date", name: "joiningDate", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "date", label: "Resignation Date", name: "resignationDate", size: "medium", fullWidth: true, field: "input", required: false },
]

export const educationDetails = [
  { variant: "outlined", type: "text", label: "Degree", name: "degreeLevel", placeholder: "E.g Bachelor", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "text", label: "Degree Name", name: "degreeTitle", placeholder: "E.g BSCS", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "number", label: "CGPA", name: "CGPA", placeholder: "E.g 3.5", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "date", label: "Completion Date", name: "completionDate", placeholder: "E.g 23-4-2020", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "Text", label: "Institute", name: "institution", placeholder: "E.g Comsats University", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "Text", label: "City", name: "city", placeholder: "E.g Islamabad", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "Text", label: "Country", name: "country", placeholder: "E.g Pakistan", size: "medium", data: countries, field: "select", multiple: false, fullWidth: true, required: true },
  { variant: "outlined", type: "Text", label: "Description", name: "details", placeholder: "E.g Lorem ipsum dolor de imit", size: "medium", fullWidth: true, field: "input" },
]

export const experienceDetails = [
  { variant: "outlined", type: "text", label: "Job Title", name: "jobTitle", placeholder: "E.g Full stack developer", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "text", label: "Organization", name: "organization", placeholder: "E.g Cloudtek", size: "medium", fullWidth: true, field: "input", required: false },
  { variant: "outlined", type: "date", label: "Start Date", name: "startDate", placeholder: "E.g 23-4-2020", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "date", label: "End Date", name: "endDate", placeholder: "E.g 23-4-2020", size: "medium", fullWidth: true, field: "input", required: true },
  { variant: "outlined", type: "Text", label: "City", name: "city", placeholder: "E.g Islamabad", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
  { variant: "outlined", type: "Text", label: "Country", name: "country", placeholder: "E.g Pakistan", size: "medium", data: countries, field: "select", multiple: false, fullWidth: true, required: true },
  { variant: "outlined", type: "Text", label: "Description", name: "details", placeholder: "E.g Lorem ipsum dolor de imit", size: "medium", fullWidth: true, field: "input", required: true },
]

export const educationFields = { degreeLevel: '', degreeTitle: '', completionDate: '', CGPA: '', country: '', city: '', details: '', employee: '', institution: '' }

export const experienceFields = { jobTitle: '', organization: '', startDate: '', endDate: '', country: '', city: '', details: '', currentlyWorking: false }