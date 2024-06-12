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
import AttendanceList from "./components/AttendanceList"
import {Success, Failure} from "./components/Notification"


function App() {

  return (
    <>
    <Success message={'Success'} />
    {/* <Failure /> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<OopsPage />} />
          <Route index element={<Login />} />
          <Route path="/punch" element={<PunchForm />} />
          <Route path="/employee" element={<EmployeeHome />}>
            <Route index element={<EmpContent />} />
            <Route path="leaveForm" element={<LeaveForm />} />
            <Route path="leaveList" element={<LeaveList />} />
            <Route path="attendanceList" element={<AttendanceList />} />
          </Route>
          <Route path="/admin" element={<AdminHome />}>
            <Route index element={<Content />} />
            <Route path="leavelist" element={<LeaveList />} />
            <Route path="leaveform" element={<LeaveForm />} />
            <Route path="attendancelist" element={<AttendanceList />} />
            <Route path="addEmployee" element={<AddEmployeeForm />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <AddEmployeeForm /> */}
    </>
  )
}

export default App
