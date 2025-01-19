import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import AuthCallBack from "./Pages/AuthCallBack"

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />
      </Routes>
    </>
  )
}

export default App
