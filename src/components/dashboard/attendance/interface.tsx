import { iEmployee } from '../employee/interface'

export interface iAttendance {
  type: string,
  email: string,
  uuid: string,
  inTime: Date,
  outTime: Date,
  employee: iEmployee,
  date: Date
}