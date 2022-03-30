import { iEmployee } from "../employee/interface";

export interface iLeave {
  uuid: string,
  requestDate: string
  requestedFrom: string
  requestedTo: string
  approvedFrom: string
  approvedTo: string
  approvedOn: string
  hours: string
  reason: string
  remaining: string
  recommendedBy: iEmployee
  approvedBy: iEmployee | string
  requestBy: iEmployee
  leaveType: iLeaveType
  status: string
  hodStatus: string
  supvStatus: string
}

export interface iLeaveType {
  uuid: string
  title: string
  daysPerYear: string
  accumulatePerMonth: string
  withoutPay: string
}