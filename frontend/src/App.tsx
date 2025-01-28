import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import AuthCallBack from "./Pages/AuthCallBack"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import AlbumPage from "./Pages/AlbumPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback
          signUpForceRedirectUrl={"/auth-callback"}
        />} />
        <Route path="/auth-callback" element={<AuthCallBack />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
