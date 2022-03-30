
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Clients from './components/dashboard/clients/index'
import Projects from './components/dashboard/projects/index'
import Employees from './components/dashboard/employee/index'
import Lists from './components/dashboard/listMaster/index'
import Attendance from './components/dashboard/attendance/index'
import Tasks from './components/dashboard/task/index'
import Login from './components/login/index'
import Landing from './components/dashboard/landing'
import '@testing-library/jest-dom/extend-expect'

jest.mock('./components/dashboard/clients/index')
jest.mock('./components/dashboard/projects/index')
jest.mock('./components/dashboard/employee/index')
jest.mock('./components/dashboard/attendance/index')
jest.mock('./components/dashboard/task/index')
jest.mock('./components/login/index')
jest.mock('./components/dashboard/landing/index')
jest.mock('./components/dashboard/listMaster/index')

describe("Tests for App component", () => {

  test("Should render all Routes in app", () => {
    Clients.mockImplementation(() => <div>Client</div>)
    Projects.mockImplementation(() => <div>Project</div>)
    Employees.mockImplementation(() => <div>Employee</div>)
    Attendance.mockImplementation(() => <div>Attendance</div>)
    Tasks.mockImplementation(() => <div>Tasks</div>)
    Login.mockImplementation(() => <div>Login</div>)
    Landing.mockImplementation(() => <div>Landing</div>)
    Lists.mockImplementation(() => <div>List</div>)
    render(
      <BrowserRouter>
        <Clients />
        <Projects />
        <Employees />
        <Attendance />
        <Tasks />
        <Login />
        <Landing />
        <Lists />
      </BrowserRouter>
    )
    expect(screen.getByText("Client")).toBeInTheDocument()
    expect(screen.getByText("Project")).toBeInTheDocument()
    expect(screen.getByText("Employee")).toBeInTheDocument()
    expect(screen.getByText("Attendance")).toBeInTheDocument()
    expect(screen.getByText("Tasks")).toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByText("List")).toBeInTheDocument()
    expect(screen.getByText("Landing")).toBeInTheDocument()
  })
})
