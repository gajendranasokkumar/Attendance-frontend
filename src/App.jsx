import AddEmployeeForm from "./components/AddEmployeeForm"
import AdminHome from "./components/AdminHome"
import EmployeeHome from "./components/EmployeeHome"
import LeaveForm from "./components/LeaveForm"
import Login from "./components/Login"
import PunchForm from "./components/PunchForm"

function App() {

  return (
    <>
      <EmployeeHome />
      <PunchForm />
      <Login />
      <AdminHome />
      <LeaveForm />
      <AddEmployeeForm />
    </>
  )
}

export default App
