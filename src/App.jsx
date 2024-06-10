import AddEmployeeForm from "./components/AddEmployeeForm"
import AdminHome from "./components/AdminHome"
import EmployeeHome from "./components/EmployeeHome"
import LeaveForm from "./components/LeaveForm"
import Login from "./components/Login"
import PunchForm from "./components/PunchForm"
import EmpContent from "./components/EmpContent"
import LeaveList from "./components/LeaveList"
import Content from './components/Content'
import OopsPage from "./components/OopsPage"


import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<OopsPage />} />
          <Route index element={<Login />} />
          <Route path="/punch" element={<PunchForm />} />
          <Route path="/employee" element={<EmployeeHome />}>
            <Route path="home" element={<EmpContent />} />
            <Route path="leaveform" element={<LeaveForm />} />
            <Route path="leavelist" element={<LeaveList />} />
          </Route>
          <Route path="/admin" element={<AdminHome />}>
            <Route index element={<OopsPage />} />
            <Route path="home" element={<Content />} />
            <Route path="leavelist" element={<LeaveList />} />
            <Route path="leaveform" element={<LeaveForm />} />
            <Route path="addEmployee" element={<AddEmployeeForm />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <AddEmployeeForm /> */}
    </>
  )
}

export default App
