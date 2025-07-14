"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/pages/LandingPage"
import { AppPage } from "./pages/AppPage"

type CurrentPage = "landing" | "app"

const CURRENT_PAGE_KEY = "currentPage"

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(CURRENT_PAGE_KEY) as CurrentPage) || "landing"
    }
    return "landing"
  })

  useEffect(() => {
    localStorage.setItem(CURRENT_PAGE_KEY, currentPage)
  }, [currentPage])

  const handleGetStarted = () => {
    setCurrentPage("app")
    localStorage.setItem(CURRENT_PAGE_KEY, "app")
  }

  const handleGoHome = () => {
    setCurrentPage("landing")
    localStorage.setItem(CURRENT_PAGE_KEY, "landing")
  }

  return currentPage === "landing" ? (
    <LandingPage onGetStarted={handleGetStarted} />
  ) : (
    <AppPage onGoHome={handleGoHome} />
  )
}

export default App
