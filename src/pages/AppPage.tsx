"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Typography, Button, Input, InputContainer, Utility, Badge, Surface, Chip } from "@visa/nova-react"
import { VisaIdeaLow, VisaCodeSnippetLow, VisaCopyLow, GenericSearchLow } from "@visa/nova-icons-react"
import { toast } from "sonner"
import { Sparkles } from "lucide-react"
import { RecentQueries } from "@/Components/recent-queries"
import { Header } from "@/Components/Header"
import { Card, CardBody, CardDescription } from "@/Components/UI/card"
import { fetchSuggestions } from "@/API/suggest";
import { fetchRecentQueries } from "@/API/recent"; 

export function AppPage() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [recentQueries, setRecentQueries] = useState<string[]>([])
  const [copiedComponentIndex, setCopiedComponentIndex] = useState<number | null>(null)

  const handleSuggest = async () => {
    if (!query.trim()) return;
  
    setIsLoading(true);
  
    try {
      const result = await fetchSuggestions(query);
      setSuggestions(result);
      setRecentQueries([query, ...recentQueries.filter((q) => q !== query)].slice(0, 5));
    } catch (error) {
      console.error("Suggestion error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    async function loadRecent() {
      const recent = await fetchRecentQueries();
      setRecentQueries(recent);
    }
    loadRecent();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSuggest()
    }
  }

  const handleComponentCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedComponentIndex(index)
      setTimeout(() => setCopiedComponentIndex(null), 2000)
    })
  }

  return (
    <div style={{ minHeight: "100vh" }}>
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
    <Header />
  </div>
      <Utility
        vFlexCol
        vPadding={48}
        style={{
          minHeight: "100vh",
          paddingTop: "80px",
          background: "linear-gradient(to bottom right, #eff6ff, #ffffff, #eef2ff)",
          width: "100%",
          boxSizing: "border-box",
          alignContent:"center",
          alignItems:"center",
        }}
      >
        <Utility vFlexCol vAlignItems="center" vRowGap={12} vMarginTop={30} vPaddingLeft={30} vPaddingRight={30}>
          <Typography variant="display-2" colorScheme="active" style={{ maxWidth: "100%", textAlign: "center" }}>
            Visa Design System AI
          </Typography>
          <Typography
            variant="subtitle-2"
            colorScheme="subtle"
            style={{ maxWidth: "90%", textAlign: "center" }}
          >
            Describe your UI in natural language and get instant component suggestions with ready-to-use code
          </Typography>
        </Utility>

        {/* Input Card */}
        <Utility style={{ width: "100%", boxSizing: "border-box" }} vMarginTop={32} vPaddingLeft={30} vPaddingRight={30}>
          <Card style={{ width: "100%" }}>
            <CardBody>
              <Utility vFlex vFlexCol vRowGap={8}>
                <Utility vFlex vAlignItems="center" vColGap={6}>
                  <VisaIdeaLow />
                  <Typography variant="headline-3">Describe Your Component</Typography>
                </Utility>
                <CardDescription>Tell us what you want to build.</CardDescription>
                <InputContainer style={{ width: "100%" }}>
                  <Utility style={{ position: "relative", width: "100%" }}>
                    <Input
                      id="component-query"
                      type="text"
                      placeholder={isFocused ? "" : "Eg: Responsive login form with remember me"}
                      value={query}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      style={{
                        paddingRight: "2.5rem",
                        height: "3rem",
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                    <GenericSearchLow
                      aria-hidden
                      style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        width: "1.25rem",
                        height: "1.25rem",
                      }}
                    />
                  </Utility>
                </InputContainer>
                <Utility vFlex vJustifyContent="between" vAlignItems="center" vMarginTop={8} style={{ flexWrap: "wrap", gap: 12 }}>
                  <Typography variant="label">
                    Press <Badge badgeType="subtle">Cmd+Enter</Badge> to generate
                  </Typography>
                  <Button
                    onClick={handleSuggest}
                    disabled={!query.trim() || isLoading}
                    iconTwoColor
                    buttonSize="large"
                    style={{
                      padding: "clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(1rem, 2vw, 1.1rem)",
                      background: "linear-gradient(to right, #2563eb, #4f46e5)",
                    }}
                  >
                    {isLoading ? "Generating..." : <><Sparkles /> Generate Components</>}
                  </Button>
                </Utility>
              </Utility>
            </CardBody>
          </Card>
        </Utility>

        {/* Main Grid */}
        <Utility vPaddingLeft={30} vPaddingRight={30}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            marginTop: 40,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Left Column */}
          <Utility
            style={{
              flex: "1 1 60%",
              minWidth: "300px",
              boxSizing: "border-box",
            }}
          >
            {suggestions ? (
              <>
                {/* Suggestions */}
                <Utility>
                  <Card>
                    <CardBody>
                      <Utility vFlex vAlignItems="center" vMarginBottom={4} vColGap={6}>
                        <VisaCodeSnippetLow />
                        <Typography variant="headline-3">Suggested Components</Typography>
                      </Utility>
                      <CardDescription>
                        Based on your description, here are the recommended Visa Design System components
                      </CardDescription>
                      {/* Scrollable container for suggested components */}
                      <Utility
                        style={{
                          maxHeight: "500px",
                          overflowY: "auto",
                          paddingRight: "4px",
                        }}
                        vFlex
                        vFlexCol
                        vGap={10}
                        vMarginTop={12}
                      >
                        {suggestions.components.map((component: any, index: number) => (
                          <Utility key={index} vFlexCol vGap={2}>
                            <Surface
                              style={{
                                border: "1px solid var(--palette-default-border)",
                                borderRadius: "12px",
                                overflow: "hidden",
                                padding: "1.2rem",
                              }}
                            >
                              <Utility
                                vFlex
                                vJustifyContent="between"
                                vAlignItems="center"
                                vMarginBottom={4}
                              >
                                <Typography variant="headline-4">{component.name}</Typography>
                                <Utility
                                  as="button"
                                  vFlex
                                  vAlignItems="center"
                                  vGap={2}
                                  style={{
                                    cursor: "pointer",
                                    background: "transparent",
                                    border: "none",
                                    fontWeight: 500,
                                    padding: "4px 8px",
                                    borderRadius: 6,
                                    color: copiedComponentIndex === index ? "#16a34a" : "#2563eb",
                                  }}
                                  onClick={() => handleComponentCopy(component.code, index)}
                                >
                                  {copiedComponentIndex === index ? (
                                    <>
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <VisaCopyLow style={{ width: 16, height: 16 }} />
                                      <CardDescription colorScheme="active">Copy</CardDescription>
                                    </>
                                  )}
                                </Utility>
                              </Utility>
                              <Typography variant="body-3" colorScheme="subtle">
                                {component.description}
                              </Typography>
                              <Utility vFlex vFlexWrap vGap={8} vColGap={8} vMarginTop={12}>
                                {component.props.map((prop: string, propIndex: number) => (
                                  <Chip key={propIndex} tag="label" readOnly>
                                    {prop}
                                  </Chip>
                                ))}
                              </Utility>
                            </Surface>
                          </Utility>
                        ))}
                      </Utility>
                    </CardBody>
                  </Card>
                </Utility>

                {/* Generated Code */}
                <Utility vMarginTop={24}>
                  <Card style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)" }}>
                    <CardBody>
                      <Utility vFlex vFlexCol vGap={4}>
                        <Utility vFlex vAlignItems="center" vJustifyContent="between">
                          <Utility vFlex vAlignItems="center" vGap={6}>
                            <VisaCodeSnippetLow style={{ color: "var(--palette-success-default)" }} />
                            <Typography variant="headline-3">Generated Code</Typography>
                          </Utility>
                          {/* Copy Button */}
                          <Utility
                            as="button"
                            vFlex
                            vAlignItems="center"
                            vGap={2}
                            style={{
                              cursor: "pointer",
                              background: "transparent",
                              border: "none",
                              fontWeight: 500,
                              padding: "4px 8px",
                              borderRadius: 6,
                              color: copied ? "#16a34a" : "#2563eb",
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(suggestions.code)
                              toast.success("Code copied to clipboard!")
                              setCopied(true)
                              setTimeout(() => setCopied(false), 5000)
                            }}
                          >
                            {copied ? (
                              <>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <VisaCopyLow style={{ width: 16, height: 16 }} />
                                <CardDescription colorScheme="active">Copy Code</CardDescription>
                              </>
                            )}
                          </Utility>
                        </Utility>
                        <CardDescription>Ready-to-use React component code</CardDescription>
                        <Utility vPaddingTop={20}>
                          <Surface
                            style={{
                              backgroundColor: "#1e1e1e",
                              color: "#d4d4d4",
                              padding: "1rem",
                              borderRadius: "8px",
                              overflow: "auto",
                              maxHeight: "500px",
                              fontSize: "0.875rem",
                              fontFamily: 'Menlo, Monaco, "Courier New"',
                            }}
                          >
                            <code style={{ whiteSpace: "pre" }}>{suggestions.code}</code>
                          </Surface>
                        </Utility>
                      </Utility>
                    </CardBody>
                  </Card>
                </Utility>

                {/* Instructions */}
                <Utility vMarginTop={24}>
                  <Card style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)" }}>
                    <CardBody>
                      <Typography variant="headline-3">Usage Instructions</Typography>
                      <Utility vFlex vFlexCol vGap={6} vMarginTop={12}>
                        {[
                          {
                            step: "1.",
                            title: "Install Dependencies",
                            desc: "npm install @visa/nova-react@latest",
                          },
                          {
                            step: "2.",
                            title: "Copy the generated code into your React component",
                          },
                          {
                            step: "3.",
                            title: "Customize props and styling as needed",
                          },
                        ].map(({ step, title, desc }) => (
                          <Utility key={step} vFlex vFlexRow vAlignItems="start" vGap={12}>
                            <Utility>
                              <Typography variant="body-2" colorScheme="active">{step}</Typography>
                            </Utility>
                            <Utility vFlex vFlexCol vGap={4}>
                              <Typography variant="body-2">{title}</Typography>
                              {desc && (
                                <Typography
                                  as="code"
                                  style={{
                                    backgroundColor: "#f3f4f6",
                                    padding: "4px 8px",
                                    borderRadius: 6,
                                    fontSize: 13,
                                    fontFamily: "monospace",
                                    display: "inline-block",
                                  }}
                                >
                                  {desc}
                                </Typography>
                              )}
                            </Utility>
                          </Utility>
                        ))}
                      </Utility>
                    </CardBody>
                  </Card>
                </Utility>
              </>
            ) : (
              <Card style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)" }}>
                <CardBody>
                  <Utility vFlex vFlexCol vAlignItems="center" vGap={12} vPaddingTop={10} vPaddingBottom={10}>
                    <VisaCodeSnippetLow style={{ width: 30, height: 30, color: "var(--palette-default-icon)" }} />
                    <Typography variant="headline-3" style={{ color: "var(--palette-default-text-primary)" }}>
                      Ready to Generate
                    </Typography>
                    <Typography
                      variant="body-2"
                      style={{ color: "var(--palette-default-text-secondary)", maxWidth: 400, textAlign: "center" }}
                    >
                      Describe your UI component above to get started with suggestions and code generation.
                    </Typography>
                  </Utility>
                </CardBody>
              </Card>
            )}
          </Utility>

          {/* Right - Sidebar */}
          <Utility style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "100%"}}>
            {suggestions && recentQueries.length > 0 && (
              <RecentQueries queries={recentQueries} onSelectQuery={setQuery} />
            )}
            <Utility vMarginBottom={24}>
            <Card>
              <CardBody>
                <Typography variant="headline-3">Example Queries</Typography>
                <CardDescription>Try these sample descriptions</CardDescription>
                <Utility vFlex vFlexCol vGap={10} vMarginTop={12}>
                  {[
                    "Responsive login form with remember me",
                    "Payment card with amount and status",
                    "Navigation header with user menu",
                    "Data table with sorting and pagination",
                  ].map((example, index) => (
                    <Button
                      key={index}
                      onClick={() => setQuery(example)}
                      style={{
                        padding: "16px 16px",
                        fontSize: "1.1rem",
                        backgroundColor: "transparent",
                        color: "#1f2937",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        textAlign: "left",
                        transition: "background-color 0.2s ease, border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.backgroundColor = "#e5e7eb"; // gray-200
                        btn.style.borderColor = "#d1d5db"; // keep border consistent
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.backgroundColor = "transparent";
                        btn.style.borderColor = "#d1d5db";
                      }}
                    >
                      <Typography variant="button-medium">{example}</Typography>
                    </Button>
                  ))}
                </Utility>
              </CardBody>
            </Card>
            </Utility>
            <Card>
              <CardBody>
                <Typography variant="headline-3">Tips for Better Results</Typography>
                <Utility vFlex vFlexCol vGap={6} vMarginTop={12}>
                  {[
                    {
                      num: "1.",
                      tip: "Be specific about the component type (form, card, button, etc.)",
                    },
                    {
                      num: "2.",
                      tip: "Mention key features like 'responsive', 'with validation', 'sortable'",
                    },
                    {
                      num: "3.",
                      tip: "Include interaction states like 'hover', 'disabled', 'loading'",
                    },
                  ].map(({ num, tip }, index) => (
                    <Utility key={index} vFlex vFlexRow vGap={12}>
                      <Typography variant="body-2" colorScheme="active">{num}</Typography>
                      <Typography variant="body-2">{tip}</Typography>
                    </Utility>
                  ))}
                </Utility>
              </CardBody>
            </Card>

          </Utility>
        </Utility>
      </Utility>
    </div>
  )
}
