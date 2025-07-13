"use client"

import { Typography, Button, Utility, Surface } from "@visa/nova-react"
import { Sparkles, Code, Zap, Palette } from "lucide-react"
import { Header } from "@/Components/Header"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <Utility>
      <Header showGetStarted onGetStarted={onGetStarted} />

      <Utility
        vFlexCol
        vPadding={16}
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "linear-gradient(to bottom right, #eff6ff, #ffffff, #eef2ff)",
        }}
      >
        {/* Hero Section */}
        <Utility vFlexCol vAlignItems="center" vJustifyContent="center" vRowGap={24} style={{ minHeight: "50vh" }}>
          <Utility vFlexCol vAlignItems="center" vRowGap={12}>
            <Typography
              variant="display-1"
              colorScheme="active"
              style={{
                textAlign: "center",
                maxWidth: "800px",
                lineHeight: 1.2,
              }}
            >
              Build Faster with VISA Design System AI
            </Typography>

            <Typography
              variant="subtitle-1"
              colorScheme="subtle"
              style={{
                maxWidth: "600px",
                textAlign: "center",
                fontSize: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              Describe your UI in natural language and get instant component suggestions with ready-to-use code from the
              VISA Design System
            </Typography>
          </Utility>

          <Utility vFlex vColGap={16} style={{ flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              onClick={onGetStarted}
              buttonSize="large"
              style={{
                padding: "16px 32px",
                fontSize: "1.1rem",
                background: "linear-gradient(to right, #2563eb, #4f46e5)",
              }}
            >
              <Sparkles style={{ width: 20, height: 20, marginRight: 8 }} />
              Get Started Now
            </Button>
          </Utility>
        </Utility>

        {/* Features Section */}
        <Utility vFlexCol vAlignItems="center" vRowGap={32} vPaddingBottom={48}>
          <Typography variant="headline-3" colorScheme="active" style={{ textAlign: "center" }}>
            Why Choose VISA Design System AI?
          </Typography>

          <Utility
            vFlex
            vRowGap={24}
            vColGap={24}
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "1200px",
            }}
          >
            {/* Feature 1 */}
            <Surface
              style={{
                padding: "32px",
                borderRadius: "16px",
                border: "1px solid var(--palette-default-border)",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                flex: "1 1 300px",
                maxWidth: "350px",
              }}
            >
              <Utility vFlexCol vRowGap={16} vAlignItems="center">
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    color: "white",
                  }}
                >
                  <Code size={32} />
                </div>
                <Typography variant="headline-3" style={{ textAlign: "center" }}>
                  Instant Code Generation
                </Typography>
                <Typography variant="body-2" colorScheme="subtle" style={{ textAlign: "center", lineHeight: 1.6 }}>
                  Describe your component in plain English and get production-ready React code using VISA Design System
                  components
                </Typography>
              </Utility>
            </Surface>

            {/* Feature 2 */}
            <Surface
              style={{
                padding: "32px",
                borderRadius: "16px",
                border: "1px solid var(--palette-default-border)",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                flex: "1 1 300px",
                maxWidth: "350px",
              }}
            >
              <Utility vFlexCol vRowGap={16} vAlignItems="center">
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981, #047857)",
                    color: "white",
                  }}
                >
                  <Zap size={32} />
                </div>
                <Typography variant="headline-3" style={{ textAlign: "center" }}>
                  Lightning Fast
                </Typography>
                <Typography variant="body-2" colorScheme="subtle" style={{ textAlign: "center", lineHeight: 1.6 }}>
                  Skip the documentation browsing. Get component suggestions and implementation details in seconds
                </Typography>
              </Utility>
            </Surface>

            {/* Feature 3 */}
            <Surface
              style={{
                padding: "32px",
                borderRadius: "16px",
                border: "1px solid var(--palette-default-border)",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                flex: "1 1 300px",
                maxWidth: "350px",
              }}
            >
              <Utility vFlexCol vRowGap={16} vAlignItems="center">
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    color: "white",
                  }}
                >
                  <Palette size={32} />
                </div>
                <Typography variant="headline-3" style={{ textAlign: "center" }}>
                  Design System Compliant
                </Typography>
                <Typography variant="body-2" colorScheme="subtle" style={{ textAlign: "center", lineHeight: 1.6 }}>
                  Every suggestion follows VISA Design System guidelines, ensuring consistency and accessibility
                </Typography>
              </Utility>
            </Surface>
          </Utility>
        </Utility>
      </Utility>
    </Utility>
  )
}
