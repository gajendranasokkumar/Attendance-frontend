// import AddEmployeeForm from "./components/AddEmployeeForm"
// import AdminHome from "./components/AdminHome"
// import EmployeeHome from "./components/EmployeeHome"
// import LeaveForm from "./components/LeaveForm"
// import Login from "./components/Login"
// import PunchForm from "./components/PunchForm"
// import EmpContent from "./components/EmpContent"
// import LeaveList from "./components/LeaveList"
// import Content from './components/Content'
// import OopsPage from "./components/OopsPage"
// import Joyride, { STATUS } from 'react-joyride';


// import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
// import AttendanceList from "./components/AttendanceList"
// import { Success, Failure } from "./components/Notification"
// import CurrentLeavePage from "./components/CurrentLeavePage"
// import { AuthProvider } from './context/AuthContext.jsx';
// import PrivateRoute from './router/PrivateRoute.jsx';
// import PastLeave from "./components/PastLeave.jsx"
// import EmpPastLeave from "./components/EmpPastLeave.jsx"
// import AttendanceHistory from "./components/AttendanceHistory.jsx"
// import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx"
// import RequestAttendanceForm from "./components/RequestAttendanceForm.jsx"
// import RequestProfileEdit from "./components/RequestProfileEdit.jsx"
// import Dashboard from "./components/Dashboard.jsx"
// import ManageAttendanceRequest from "./components/ManageAttendanceRequest.jsx"
// import NewComp from "./components/NewComp.jsx"
// import EmployeeList from "./components/EmployeeList.jsx"
// import Tour from "./components/Tour.jsx"




// function App() {

//   return (
//     <>
//       {/* <Success message={'Success'} /> */}
//       {/* <Failure /> */}
//       <Tour />
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="*" element={<OopsPage />} />
//             <Route index element={<Login />} />
//             <Route path="/punch" element={<PunchForm />} />
//             {/* <Route path="/new" element={<NewComp />} /> */}
//             <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
//             <Route path="/employee" element={<PrivateRoute role={'Employee'}><EmployeeHome /></PrivateRoute>}>
//               <Route index element={<EmpContent />} />
//               <Route path="leaveForm" element={<LeaveForm />} />
//               <Route path="leaveList" element={<EmpPastLeave />} />
//               <Route path="leaveStatus" element={<CurrentLeavePage />} />
//               <Route path="attendanceList" element={<AttendanceList />} />
//               <Route path="attendanceHistory" element={<AttendanceHistory />} />
//               <Route path="requestattendance" element={<RequestAttendanceForm />} />
//               <Route path="requestprofileedit" element={<RequestProfileEdit />} />
//             </Route>
//             {/* <Route path="/admin" element={<AdminHome />}> */}
//             <Route path="/admin" element={<PrivateRoute role={'Admin'}><AdminHome /></PrivateRoute>}>
//               <Route index element={<Content />} />
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="leavelist" element={<LeaveList />} />
//               <Route path="pastleave" element={<PastLeave />} />
//               <Route path="leaveform" element={<LeaveForm />} />
//               <Route path="attendancelist" element={<AttendanceList />} />
//               <Route path="attendancehistory" element={<AttendanceHistory />} />
//               <Route path="requestattendance" element={<RequestAttendanceForm />} />
//               <Route path="addEmployee" element={<AddEmployeeForm />} />
//               <Route path="manageattendancerequest" element={<ManageAttendanceRequest />} />
//               <Route path="employeelist" element={<EmployeeList />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//       {/* <AddEmployeeForm /> */}
//       {/* <AddEmployeeForm /> */}
//     </>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Joyride, { STATUS } from 'react-joyride';

import AddEmployeeForm from "./components/AddEmployeeForm";
import AdminHome from "./components/AdminHome";
import EmployeeHome from "./components/EmployeeHome";
import LeaveForm from "./components/LeaveForm";
import Login from "./components/Login";
import PunchForm from "./components/PunchForm";
import EmpContent from "./components/EmpContent";
import LeaveList from "./components/LeaveList";
import Content from './components/Content';
import OopsPage from "./components/NotFoundPage.jsx";
import AttendanceList from "./components/AttendanceList";
import { Success, Failure } from "./components/Notification";
import CurrentLeavePage from "./components/CurrentLeavePage";
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './router/PrivateRoute.jsx';
import PastLeave from "./components/PastLeave.jsx";
import EmpPastLeave from "./components/EmpPastLeave.jsx";
import AttendanceHistory from "./components/AttendanceHistory.jsx";
import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx";
import RequestAttendanceForm from "./components/RequestAttendanceForm.jsx";
import RequestProfileEdit from "./components/RequestProfileEdit.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ManageAttendanceRequest from "./components/ManageAttendanceRequest.jsx";
import NewComp from "./components/NewComp.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import NotFoundPage from './components/NotFoundPage.jsx';
import Loader from './components/Loader.jsx';
import ManagerEmpLists from './components/ManagerEmpLists.jsx';
import EmpTeamAttendance from './components/EmpTeamAttendance.jsx';
import ManageTeamLeave from './components/ManageTeamLeave.jsx';

const Tour = () => {
  const [runTour, setRunTour] = useState(false);
  const location = useLocation();

  const steps = [
    {
      target: '.intro',
      content: 'Hey there Welcome to our app !! Let us to take you a small tour',
    },
    {
      target: '.step-1',
      content: 'Make sure you have changed your password here once you logged in!!',
    },
    {
      target: '.checkinbox',
      content: 'Here you can control your checkin and checkout and you can monitor total hours of working.',
    },
    {
      target: '.personaldetails',
      content: 'Here you can see your personal details and you can request to your admin if you have to make some changes!! CHECK PROFILE SECTION ',
    },
    {
      target: '.step-2',
      content: 'Here you can view your dashboard and your personal details.',
    },
    {
      target: '.step-3',
      content: 'Your Attendance will be maintained automatically and you can se here also you can see the history.',
    },
    {
      target: '.step-4',
      content: 'All your leave requests were maintained here and you can apply or verify the status here...',
    },
    {
      target: '.step-5',
      content: 'Here you can view your dashboard and your personal details.',
    },
    {
      target: '.step-6',
      content: 'Here you can view your dashboard and your personal details.',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('tourShown', 'true');
    }
  };

  useEffect(() => {
    const tourShown = localStorage.getItem('tourShown');
    if (!tourShown) {
      setRunTour(true);
    }
  }, []);

  useEffect(() => {
    if (!runTour) return;
    setRunTour(true);
  }, [location]);

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
    />
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Tour />
          {/* <Loader />   */}
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<Login />} />
            <Route path="/addnew" element={<AddEmployeeForm />} />
            <Route path="/punch" element={<PunchForm />} />
            {/* <Route path="/new" element={<NewComp />} /> */}
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
              <Route path="forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="employeelist" element={<ManagerEmpLists />} />
              <Route path="teamattendance" element={<EmpTeamAttendance />} />
              <Route path="teamleave" element={<ManageTeamLeave />} />
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
              <Route path="requestattendance" element={<RequestAttendanceForm />} />
              <Route path="addEmployee" element={<AddEmployeeForm />} />
              <Route path="manageattendancerequest" element={<ManageAttendanceRequest />} />
              <Route path="employeelist" element={<EmployeeList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
