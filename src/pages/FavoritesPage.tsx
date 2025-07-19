"use client"
import { useEffect, useState } from "react"
import { Typography, Utility, Button } from "@visa/nova-react"
import { VisaCopyLow, VisaCodeSnippetLow, VisaDeleteLow } from "@visa/nova-icons-react"
import { Card, CardBody } from "@/Components/UI/card"
import { Header } from "@/Components/Header"
import axiosInstance from "@/config/axios"
import axios from "axios"

interface Favorite {
  _id: string
  prompt: string
  code: string
}

export function FavoritesPage({ onGoHome, onNavigate }: { onGoHome: () => void; onNavigate: (path: string) => void }) {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const fetchFavorites = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axiosInstance.get("/favorites")
      setFavorites(res.data)
    } catch (err: any) {
      console.error("Failed to fetch favorites", err)
      setError(err?.response?.data?.message || "Failed to fetch favorites. Please log in.")
      setFavorites([])
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        onNavigate("/signin")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [onNavigate])

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/favorites/${id}`)
      setFavorites((prev) => prev.filter((f) => f._id !== id))
    } catch (err) {
      console.error("Failed to delete favorite", err)
    }
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <Header onGoHome={onGoHome} onNavigate={onNavigate} />
      </div>
      <Utility
        vFlexCol
        vPadding={48}
        style={{
          paddingTop: "80px",
          background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
          width: "100%",
          minHeight: "100vh",
          boxSizing: "border-box",
          alignItems: "center", 
        }}
      >
        <Utility vFlexCol vAlignItems="center" vRowGap={12} vMarginTop={30} vPaddingLeft={30} vPaddingRight={30}>
          <Typography variant="display-2" colorScheme="active" style={{ textAlign: "center", marginBottom: "32px" }}>
            Your Favorite Snippets
          </Typography>
        </Utility>
        {loading ? (
          <Typography variant="body-2" colorScheme="subtle">
            Loading favorites...
          </Typography>
        ) : error ? (
          <Typography variant="body-2" style={{ textAlign: "center" }}>
            {error}
          </Typography>
        ) : favorites.length === 0 ? (
          <Utility vFlexCol vAlignItems="center" vRowGap={16} vMarginTop={32}>
            <Typography variant="headline-3" colorScheme="subtle" style={{ textAlign: "center" }}>
              No favorites saved yet.
            </Typography>
            <Typography variant="body-2" colorScheme="subtle" style={{ textAlign: "center" }}>
              Go to the Dashboard to generate and save your first component!
            </Typography>
          </Utility>
        ) : (
          <Utility
            vFlex 
            vFlexWrap 
            vGap={24} 
            vMarginTop={32}
            style={{
              justifyContent: "center", 
              width: "100%",
              maxWidth: "100%", 
            }}
          >
            {favorites.map((fav, idx) => (
              <Card
                key={fav._id || idx}
                style={{
                  flex: "1 1 calc(50% - 12px)", 
                  maxWidth: "calc(50% - 12px)", 
                  minWidth: "300px", 
                  boxSizing: "border-box",
                  border: "1px solid var(--palette-default-border)",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
                }}
              >
                <CardBody>
                  <Utility vFlex vJustifyContent="between" vAlignItems="center" vMarginBottom={8}>
                    <Utility vFlex vAlignItems="center" vColGap={8}>
                      {/* Icon next to the prompt for visual appeal */}
                      <VisaCodeSnippetLow style={{ width: 20, height: 20, color: "var(--palette-default-icon)" }} />
                      <Typography variant="headline-4">{fav.prompt}</Typography>
                    </Utility>
                    <Utility vFlex vAlignItems="center" vColGap={4}>
                    {/* Copy Code Button */}
                      <Button
                        onClick={() => handleCopy(fav.code, idx)}
                        buttonSize="small"
                        colorScheme="tertiary"
                        style={{
                          color: copiedIndex === idx ? "#16a34a" : "#2563eb",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {copiedIndex === idx ? (
                          "Copied!"
                        ) : (
                          <>
                            <VisaCopyLow style={{ width: 16, height: 16 }} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </Button>

                      {/* Delete Icon Button */}
                      <Button
                        aria-label="Delete"
                        destructive
                        colorScheme="secondary"
                        iconButton
                        buttonSize="small"
                        style={{
                          padding: 8,
                          background: "transparent",
                          border: "none",
                          boxShadow: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "6px",
                          transition: "background-color 0.2s ease-in-out",
                        }}
                        onClick={() => handleDelete(fav._id)}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffe5e5" // Light red hover
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"
                        }}
                      >
                        <VisaDeleteLow style={{ color: "var(--palette-destructive-text)" }} />
                      </Button>

                    </Utility>

                  </Utility>
                  <div
                    style={{
                      background: "#1e1e1e", 
                      color: "#d4d4d4",
                      padding: "1rem",
                      borderRadius: "8px",
                      overflow: "auto", 
                      fontSize: "0.875rem",
                      fontFamily: 'Menlo, Monaco, "Courier New"',
                      maxHeight: "400px", 
                    }}
                  >
                    <code style={{ whiteSpace: "pre-wrap" }}>{fav.code}</code>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Utility>
        )}
      </Utility>
    </>
  )
}
