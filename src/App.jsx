import Content from "./Content"
import LeaveForm from "./LeaveForm"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

function App() {

  return (
    <>
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
