"use client"

import type React from "react"

import { useState } from "react"
import { Button, Input, InputContainer, Link, Surface, Typography, Utility } from "@visa/nova-react"
import { Header } from "@/Components/Header"
import axios from "@/config/axios"

interface SignInPageProps {
  onNavigate: (path: string) => void
}

export function SignInPage({ onNavigate }: SignInPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
  
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
  
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      })
  
      console.log("Logged in:", res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userName", `${res.data.firstName} ${res.data.lastName}`); 
      localStorage.setItem("loginStatus", Date.now().toString());
        onNavigate("/app");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed."
      setError(msg)
    }
  }

  return (
    <>
      <Header onGoHome={() => onNavigate("/")} onNavigate={onNavigate} />
    <Utility vFlexCol vAlignItems="center" vJustifyContent="center" vPadding={48} style={{ minHeight: "100vh" }}>
      <Surface
        style={{
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid var(--palette-default-border)",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Utility vFlexCol vRowGap={24}>
          <Typography variant="headline-2" style={{ textAlign: "center" }}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Utility vFlexCol vRowGap={16}>
              <InputContainer>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
              </InputContainer>
              <InputContainer>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
              </InputContainer>
              {error && (
                <Typography variant="body-3" style={{ textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" buttonSize="large" style={{ width: "100%" }}>
                Sign In
              </Button>
            </Utility>
          </form>
          <Utility vFlexCol vRowGap={8} vAlignItems="center">
            <Typography variant="body-2">
              First time user?{" "}
              <Link href="#/signup" onClick={() => onNavigate("/signup")} noUnderline>
                Create an account
              </Link>
            </Typography>
          </Utility>
        </Utility>
      </Surface>
    </Utility>
    </>
  )
}
