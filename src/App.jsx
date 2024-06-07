import Content from "./Content"
import LeaveForm from "./LeaveForm"
import Login from "./Login"
import Navbar from "./Navbar"
import PunchForm from "./PunchForm"
import Sidebar from "./Sidebar"

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
