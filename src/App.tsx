"use client"

import { useEffect, useState } from "react"
import { LandingPage } from "@/pages/LandingPage"
import { AppPage } from "./pages/AppPage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"
import { FavoritesPage } from "@/pages/FavoritesPage"


type CurrentRoute = "/" | "/app" | "/signin" | "/signup" | "/favorites"

function App() {
  const [currentRoute, setCurrentRoute] = useState<CurrentRoute>("/")

  useEffect(() => {
    const handleHashChange = () => {
      const path = (window.location.hash.substring(1) || "/") as CurrentRoute
      setCurrentRoute(path)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateTo = (path: string) => {
    if (window.location.hash !== `#${path}`) {
      window.location.hash = path
    }
    setCurrentRoute(path as CurrentRoute)
  }  

  switch (currentRoute) {
    case "/app":
      return <AppPage onGoHome={() => navigateTo("/")} onNavigate={navigateTo} />
    case "/signin":
      return <SignInPage onNavigate={navigateTo} />
    case "/signup":
      return <SignUpPage onNavigate={navigateTo} />
    case "/favorites":
      return <FavoritesPage onGoHome={() => navigateTo("/")} onNavigate={navigateTo} />
    case "/":
    default:
      return <LandingPage onGetStarted={() => navigateTo("/app")} onNavigate={navigateTo} />
  }
}

export default App
