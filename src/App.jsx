import Content from "./components/Content"
import LeaveForm from "./components/LeaveForm"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import PunchForm from "./components/PunchForm"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
      <PunchForm />
      <Login />
      <Navbar />
      <div className="flex w-[100vw]">
        <Sidebar />
        <Content />
      </div>
      <LeaveForm />
    </>
  )
}

export default App
