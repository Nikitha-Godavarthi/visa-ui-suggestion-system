"use client"

import { VisaTimeTiny } from "@visa/nova-icons-react"
import { Typography, Utility, Badge } from "@visa/nova-react"
import { Card } from "@/Components/UI/card"

interface RecentQueriesProps {
  queries: string[]
  onSelectQuery: (query: string) => void
}

export function RecentQueries({ queries, onSelectQuery }: RecentQueriesProps) {
  if (queries.length === 0) return null

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <Utility vFlexCol vGap={4} vPadding={20}>
        <Utility vFlex vAlignItems="center" vColGap={6}>
          <VisaTimeTiny/>
          <Typography variant="headline-4">Recent Queries</Typography>
        </Utility>

        <Typography variant="body-2" colorScheme="subtle">
          Click to reuse a previous query
        </Typography>

        <Utility vFlex vFlexCol vGap={10} vMarginTop={12}>
          {queries.map((query, index) => (
            <Badge
              key={index}
              onClick={() => onSelectQuery(query)}
              badgeType="subtle"
            >
            <Utility vPaddingLeft={6} vPaddingRight={6}>
              <Typography
                variant="body-2"
              >
                {query}
              </Typography>
            </Utility>
            </Badge>
          ))}
        </Utility>
      </Utility>
    </Card>
  )
}
