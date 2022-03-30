export interface iShift {
  uuid: string,
  name: string,
  timeStart: Date,
  hoursDuration: string,
  lateFlexibility: string,
  earlyLeaveFlexibility: string
}
export interface iShiftHistoryProps {
  pathname: string,
  state: {
    page: string,
    data: iShift
  }
}