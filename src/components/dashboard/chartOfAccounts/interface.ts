export interface iCoaDialog {
  open: boolean;
  title: string;
  data: any;
  name: string;
}

export interface iCoa {
  name: string;
  gl_Code: string;
  level: number;
  parent: string;
  rank: number;
  financialYear: string;
  company: string;
}

export interface iCoaFilter {
  fyId: string | null;
  companyId: string | null;
}
