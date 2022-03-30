import { forwardRef } from 'react';
import { ViewColumn, Clear, Check, ArrowDownward, AddBox, ChevronRight, ChevronLeft, Search, Edit, SaveAlt, Remove, DeleteOutline, LastPage, FirstPage, FilterList } from "@material-ui/icons"
import MaterialTable from "material-table";

const tableIcons: any = {
  Add: forwardRef((props: any, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props: any, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props: any, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props: any, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props: any, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props: any, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props: any, ref) => <ViewColumn {...props} ref={ref} />)
};

interface iComponentProps {
  title?: string,
  columns: Array<any>,
  data: Array<any>,
  actions?: Array<any>,
  options?: Object,
  editable?: Object,
  detailPanel?: any
}

const Table = (props: iComponentProps) => {
  return (
    <MaterialTable
      icons={tableIcons}
      title={props.title}
      columns={props.columns}
      data={props.data}
      actions={props.actions}
      options={props.options}
      editable={props.editable}
      detailPanel={props.detailPanel}
    />
  );
}

export default Table;
