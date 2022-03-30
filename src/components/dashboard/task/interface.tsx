import { iEmployee } from "../employee/interface";
import { iProject } from "../projects/interface";

export interface iTask {
  title: string,
  description: string,
  deadline: string,
  status: string,
  estimatedHours: number,
  rating: string,
  review: string,
  note: string,
  project: iProject | string,
  resources: [],
  uuid: string,
  assignedTo: iEmployee
  id: number,
}

export interface iTaskHistoryProps {
  pathname: string,
  state: any
}