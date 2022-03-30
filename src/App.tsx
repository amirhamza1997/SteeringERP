import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Clients from './components/dashboard/clients'
import Projects from './components/dashboard/projects'
import Employees from './components/dashboard/employee'
import Lists from './components/dashboard/listMaster'
import Attendance from './components/dashboard/attendance'
import Tasks from './components/dashboard/task'
import Login from './components/login'
import Landing from './components/dashboard/landing'
import Profile from './components/dashboard/profile'
import Setting from './components/dashboard/setting'
import ProtectedRoute from "./protectedRoutes"
import TaskDetail from './components/dashboard/taskDetail'
import TimeSheet from './components/dashboard/timeSheet'
import ProjectDetail from './components/dashboard/projects/projectDetail'
import ClientDetail from './components/dashboard/clients/clientDetail'
import ProjectForm from './components/dashboard/projects/projectForm'
import ClientForm from './components/dashboard/clients/clientForm'
import TaskForm from './components/dashboard/task/taskForm'
import Company from './components/dashboard/company'
import Department from './components/dashboard/department'
import Designation from './components/dashboard/designation'
import Shift from './components/dashboard/shift'
import ShiftForm from './components/dashboard/shift/shiftForm'
import PayScale from './components/dashboard/payScale'
import GeneralExpense from './components/dashboard/generalExpence.tsx'
import LeaveApply from './components/dashboard/leave/leaveApply'
import LeaveReview from './components/dashboard/leave/leaveReview'
import LeaveListing from './components/dashboard/leave'
import LeaveRequest from './components/dashboard/leave/leaveRequest'
import ChartOfAccounts from './components/dashboard/chartOfAccounts'
import LeaveRecord from './components/dashboard/leave/leaveRecord'
import User from './components/dashboard/user'
import UserForm from './components/dashboard/user/userForm'
import UserRoles from './components/dashboard/userRoles'
import UserPermissions from './components/dashboard/userPermissions'

const App = () => {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'VarelaRound',
      ].join(','),
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:user/:token" component={Login} />
          <ProtectedRoute exact path="/" component={Landing} />
          <ProtectedRoute exact path="/profile/:page/:empId" component={Profile} />
          <ProtectedRoute exact path="/setting" component={Setting} />
          <ProtectedRoute exact path="/client" component={Clients} />
          <ProtectedRoute exact path="/chartofaccounts" component={ChartOfAccounts} />
          <ProtectedRoute exact path="/client/detail" component={ClientDetail} />
          <ProtectedRoute exact path="/client/create" component={ClientForm} />
          <ProtectedRoute exact path="/client/:clientId" component={ClientForm} />
          <ProtectedRoute exact path="/project" component={Projects} />
          <ProtectedRoute exact path="/payscale" component={PayScale} />
          <ProtectedRoute exact path="/project/detail" component={ProjectDetail} />
          <ProtectedRoute exact path="/project/create" component={ProjectForm} />
          <ProtectedRoute exact path="/project/:projId" component={ProjectForm} />
          <ProtectedRoute exact path="/hr/employees" component={Employees} />
          <ProtectedRoute exact path="/hr/employees/:page/" component={Profile} />
          <ProtectedRoute exact path="/hr/employees/:page/:empId" component={Profile} />
          <ProtectedRoute exact path="/admin/lists" component={Lists} />
          <ProtectedRoute exact path="/admin/userRoles" component={UserRoles} />
          <ProtectedRoute exact path="/admin/permissions" component={UserPermissions} />
          <ProtectedRoute exact path="/company" component={Company} />
          <ProtectedRoute exact path="/department" component={Department} />
          <ProtectedRoute exact path="/designation" component={Designation} />
          <ProtectedRoute exact path="/task" component={Tasks} />
          <ProtectedRoute exact path="/task/create" component={TaskForm} />
          <ProtectedRoute exact path="/task/:taskId" component={TaskForm} />
          <ProtectedRoute exact path="/tasks/detail" component={TaskDetail} />
          <ProtectedRoute exact path="/hr/attendance" component={Attendance} />
          <ProtectedRoute exact path="/general-expense" component={GeneralExpense} />
          <ProtectedRoute exact path="/tasks/timesheets" component={TimeSheet} />
          <ProtectedRoute exact path="/shift" component={Shift} />
          <ProtectedRoute exact path="/shift/create" component={ShiftForm} />
          <ProtectedRoute exact path="/shift/:shiftId" component={ShiftForm} />
          <ProtectedRoute exact path="/chartOfAccounts" component={ChartOfAccounts} />
          {/* <ProtectedRoute exact path="/leave/history" component={LeaveListing} /> */}
          <ProtectedRoute exact path="/leave/apply" component={LeaveApply} />
          <ProtectedRoute exact path="/leave/review/:leaveId" component={LeaveReview} />
          <ProtectedRoute exact path="/employees/leave-requests" component={LeaveRequest} />
          <ProtectedRoute exact path="/employees/leave-record" component={LeaveRecord} />
          <ProtectedRoute exact path="/employees/leave-history/:empId" component={LeaveListing} />
          <ProtectedRoute exact path="/user" component={User} />
          <ProtectedRoute exact path="/user/:page" component={UserForm} />
          <ProtectedRoute exact path="/user/:page/:userId" component={UserForm} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App