export interface iTimeSheet {
  hours: string,
  notes: string,
  billedHoursDev: string,
  billedHoursPM: string,
  billable: boolean,
  date: Date,
  approvedBySupervisor: boolean,
  approvedByProjectManager: boolean,
  task: string,
  employee: string
}