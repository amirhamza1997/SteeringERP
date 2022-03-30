import { iShift } from '../shift/interface'
import { iCompany } from '../company/interface'
import { iDepartment } from '../department/interface'
import { iDesignation } from '../designation/interface'
import { iEmployee } from '../employee/interface'
import { iPayScale } from '../payScale/interface'

export interface iEducation {
  degreeLevel: string,
  degreeTitle: string,
  completionDate: string,
  CGPA: string,
  country: string,
  city: string,
  details: string,
  employee?: string,
  institution: string,
  uuid?: string
}

export interface iExperience {
  jobTitle: string,
  organization: string,
  country: string,
  city: string,
  startDate: string,
  endDate: string,
  currentlyWorking: boolean,
  details: string,
  employee?: string,
  uuid?: string
}

export interface iProfile {
  email: string,
  bloodGroup: string,
  cellNo: string,
  cnic: string,
  currentAddress: string,
  employeeCode: string,
  fatherName: string,
  fullName: string,
  gender: Boolean,
  isActive: Boolean,
  maritalStatus: string,
  permanentAddress: string,
  phoneNo: string,
  payRate: string,
  payCurrency: string,
  payType: string,
  payPeriod: string,
  dateOfBirth: string,
  nationality: string,
  organization: string,
  role: string
  uuid: string,
  id: string,
  party?: object
  partyType?: object
  qualifications?: iEducation[],
  experiences?: iExperience[]
  techStack: Array<any>
}

export interface iHistoryProp {
  pathname: string,
  state: { page: string, companies: iCompany[], department: iDepartment[], designation: iDesignation[], shift: iShift[], employee: iEmployee[], payScale: iPayScale[] }
}