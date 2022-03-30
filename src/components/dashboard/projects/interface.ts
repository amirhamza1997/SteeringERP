import { iClient } from "../clients/interface";
import { iEmployee } from '../employee/interface'

export interface iProject {
  client: iClient | null,
  closeDate: string | null
  description: string
  manager: iEmployee | null
  name: string
  notes: string
  rate: string
  resources: Array<iEmployee>
  startDate: string | null
  term: string
  typeOfWork: string
  uuid: string
  voice: iEmployee | null
  currency: string
  id: string
  billingEmail: string | null
  managedBy: string | null
  company: string | null
  projectType: string
}
export interface iID {
  projId: string
}
export interface iHistoryProp {
  location?: any
  state?: any
  page?: any
  goBack?: any;

}