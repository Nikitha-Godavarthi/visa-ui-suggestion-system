"use client"

import type React from "react"

import { useState } from "react"
import { Button, Input, InputContainer, Link, Surface, Typography, Utility } from "@visa/nova-react"
import { Header } from "@/Components/Header"
import axios from "@/config/axios"

interface SignUpPageProps {
  onNavigate: (path: string) => void
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
  
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
  
    try {
      const res = await axios.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
      })
  
      console.log("Registered:", res.data)
      onNavigate("/signin") // Navigate to sign-in after success
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Registration failed."
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
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <Utility vFlexCol vRowGap={24}>
          <Typography variant="headline-2" style={{ textAlign: "center" }}>
            Create an Account
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
              <Utility vFlex vColGap={16} style={{ flexWrap: "wrap" }}>
                <InputContainer style={{ flex: 1, minWidth: "150px" }}>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    required
                    aria-label="First Name"
                  />
                </InputContainer>
                <InputContainer style={{ flex: 1, minWidth: "150px" }}>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    required
                    aria-label="Last Name"
                  />
                </InputContainer>
              </Utility>
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
              <InputContainer>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  required
                  aria-label="Confirm Password"
                />
              </InputContainer>
              {error && (
                <Typography variant="body-3" style={{ textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" buttonSize="large" style={{ width: "100%" }}>
                Sign Up
              </Button>
            </Utility>
          </form>
          <Utility vFlexCol vRowGap={8} vAlignItems="center">
            <Typography variant="body-2">
              Already have an account?{" "}
              <Link href="#/signin" onClick={() => onNavigate("/signin")} noUnderline>
                Sign In
              </Link>
            </Typography>
          </Utility>
        </Utility>
      </Surface>
    </Utility>
    </>
  )
}
