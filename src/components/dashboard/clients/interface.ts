export interface iClient {
  uuid: string,
  email: string,
  name: string,
  phone: string,
  location: string,
  timezone: string,
  relocation: boolean,
  remote: boolean,
  communication: string,
  billingCycle: string,
  billingMode: string,
  profile: string,
  nextInvoiceDate: string,
  party: string,
  partyType: string,
  id: number
  company: any
}
export interface iLocationProp {
  pathname: string,
  state: iClient
}
export interface iSnackBar {
  open: boolean,
  message: string
}