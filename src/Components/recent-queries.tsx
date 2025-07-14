"use client"

import { VisaTimeTiny } from "@visa/nova-icons-react"
import { Typography, Utility, Button } from "@visa/nova-react"
import { Card } from "@/Components/UI/card"

interface RecentQueriesProps {
  queries: string[]
  onSelectQuery: (query: string) => void
}

export function RecentQueries({ queries, onSelectQuery }: RecentQueriesProps) {
  if (queries.length === 0) return null

  return (
    <Utility vMarginBottom={24}>
    <Card>
      <Utility vFlexCol vGap={4} vPadding={20}>
        <Utility vFlex vAlignItems="center" vColGap={6}>
          <VisaTimeTiny/>
          <Typography variant="headline-3">Recent Queries</Typography>
        </Utility>

        <Typography variant="body-2" colorScheme="subtle">
          Click to reuse a previous query
        </Typography>

        <Utility vFlex vFlexCol vGap={10} vMarginTop={12}>
          {queries.map((query, index) => (
            <Button
            key={index}
            onClick={() => onSelectQuery(query)}
            style={{
              padding: "16px 32px",
              fontSize: "1.1rem",
              backgroundColor: "transparent",
              color: "#1f2937",
              border: "1px solid #d1d5db", // gray border
              borderRadius: "8px",
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "#e5e7eb"; // Tailwind gray-200
              btn.style.borderColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "transparent";
              btn.style.borderColor = "#d1d5db";
            }}
          >
            <Utility vPaddingLeft={6} vPaddingRight={6}>
              <Typography variant="button-medium">{query}</Typography>
            </Utility>
          </Button>
          
          ))}
        </Utility>
      </Utility>
    </Card>
    </Utility>
  )
}
