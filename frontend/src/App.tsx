import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import AuthCallBack from "./Pages/AuthCallBack"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback
          signUpForceRedirectUrl={"/auth-callback"}
        />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />
      </Routes>
    </>
  )
}

export default App
