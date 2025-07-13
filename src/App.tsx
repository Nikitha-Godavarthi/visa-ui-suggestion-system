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

  const handleBackToHome = () => {
    setCurrentPage("landing")
  }

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <AppPage onBackToHome={handleBackToHome} />
      )}
    </>
  )
}

export default App
