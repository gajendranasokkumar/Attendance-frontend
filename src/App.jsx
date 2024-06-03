import Content from "./Content"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

function App() {

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Content />
      </div>
    </>
  )
}

export default App
