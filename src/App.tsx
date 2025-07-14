"use client"

import { useEffect, useState } from "react"
import { LandingPage } from "@/pages/LandingPage"
import { AppPage } from "./pages/AppPage"

type CurrentPage = "landing" | "app"
const CURRENT_PAGE_KEY = "currentPage"

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage | null>(null)

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

    if (navType && navType.type === "reload") {
      const sessionPage = sessionStorage.getItem(CURRENT_PAGE_KEY) as CurrentPage | null
      setCurrentPage(sessionPage || "landing")
    } else {
      setCurrentPage("landing")
    }
  }, [])

  useEffect(() => {
    if (currentPage) {
      sessionStorage.setItem(CURRENT_PAGE_KEY, currentPage)
    }
  }, [currentPage])

  const handleGetStarted = () => setCurrentPage("app")
  const handleGoHome = () => setCurrentPage("landing")

  if (!currentPage) return null

  return currentPage === "landing" ? (
    <LandingPage onGetStarted={handleGetStarted} />
  ) : (
    <AppPage onGoHome={handleGoHome} />
  )
}

export default App
