"use client"

import { useEffect, useState } from "react"
import { LandingPage } from "@/pages/LandingPage"
import { AppPage } from "./pages/AppPage"

type CurrentPage = "landing" | "app"
const CURRENT_PAGE_KEY = "currentPage"

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage | null>(null) // null = not ready yet

  useEffect(() => {
    const storedPage = localStorage.getItem(CURRENT_PAGE_KEY) as CurrentPage | null
    setCurrentPage(storedPage || "landing")
  }, [])

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem(CURRENT_PAGE_KEY, currentPage)
    }
  }, [currentPage])

  const handleGetStarted = () => {
    setCurrentPage("app")
    localStorage.setItem(CURRENT_PAGE_KEY, "app")
  }

  const handleGoHome = () => {
    setCurrentPage("landing")
    localStorage.setItem(CURRENT_PAGE_KEY, "landing")
  }

  if (!currentPage) return null

  return currentPage === "landing" ? (
    <LandingPage onGetStarted={handleGetStarted} />
  ) : (
    <AppPage onGoHome={handleGoHome} />
  )
}

export default App
