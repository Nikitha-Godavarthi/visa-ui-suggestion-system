"use client"

import { useState } from "react"
import { LandingPage } from "@/Components/LandingPage"
import { AppPage } from "./pages/AppPage"

type CurrentPage = "landing" | "app"

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing")

  const handleGetStarted = () => {
    setCurrentPage("app")
  }

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <AppPage/>
      )}
    </>
  )
}

export default App
