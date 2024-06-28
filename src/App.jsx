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


import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AttendanceList from "./components/AttendanceList"
import { Success, Failure } from "./components/Notification"
import CurrentLeavePage from "./components/CurrentLeavePage"
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './router/PrivateRoute.jsx';
import PastLeave from "./components/PastLeave.jsx"
import EmpPastLeave from "./components/EmpPastLeave.jsx"
import AttendanceHistory from "./components/AttendanceHistory.jsx"
import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx"
import RequestAttendanceForm from "./components/RequestAttendanceForm.jsx"
import RequestProfileEdit from "./components/RequestProfileEdit.jsx"
import Dashboard from "./components/Dashboard.jsx"
import ManageAttendanceRequest from "./components/ManageAttendanceRequest.jsx"
import NewComp from "./components/NewComp.jsx"


function App() {

  return (
    <>
      {/* <Success message={'Success'} /> */}
      {/* <Failure /> */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<OopsPage />} />
            <Route index element={<Login />} />
            <Route path="/punch" element={<PunchForm />} />
            <Route path="/new" element={<NewComp />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/employee" element={<PrivateRoute role={'Employee'}><EmployeeHome /></PrivateRoute>}>
              <Route index element={<EmpContent />} />
              <Route path="leaveForm" element={<LeaveForm />} />
              <Route path="leaveList" element={<EmpPastLeave />} />
              <Route path="leaveStatus" element={<CurrentLeavePage />} />
              <Route path="attendanceList" element={<AttendanceList />} />
              <Route path="attendanceHistory" element={<AttendanceHistory />} />
              <Route path="requestattendance" element={<RequestAttendanceForm />} />
              <Route path="requestprofileedit" element={<RequestProfileEdit />} />
            </Route>
            {/* <Route path="/admin" element={<AdminHome />}> */}
            <Route path="/admin" element={<PrivateRoute role={'Admin'}><AdminHome /></PrivateRoute>}>
              <Route index element={<Content />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leavelist" element={<LeaveList />} />
              <Route path="pastleave" element={<PastLeave />} />
              <Route path="leaveform" element={<LeaveForm />} />
              <Route path="attendancelist" element={<AttendanceList />} />
              <Route path="attendancehistory" element={<AttendanceHistory />} />
              <Route path="addEmployee" element={<AddEmployeeForm />} />
              <Route path="manageattendancerequest" element={<ManageAttendanceRequest />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <AddEmployeeForm /> */}
      {/* <AddEmployeeForm /> */}
    </>
  )
}

export default App
