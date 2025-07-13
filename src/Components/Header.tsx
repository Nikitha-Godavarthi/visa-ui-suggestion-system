"use client"

import { Button, Link, Nav, NavAppName, Typography, Utility, UtilityFragment, VisaLogo } from "@visa/nova-react"

interface HeaderProps {
  showGetStarted?: boolean
  onGetStarted?: () => void
}

export function Header({ showGetStarted = false, onGetStarted }: HeaderProps) {
  return (
    <UtilityFragment vJustifyContent="between">
      <Nav orientation="horizontal" tag="header">
        <UtilityFragment vFlex vGap={16}>
          <Link aria-label="Visa Design System Home" href="/" noUnderline style={{ backgroundColor: "transparent" }}>
            <VisaLogo />
            <NavAppName>
              <Typography variant="headline-3">Design System</Typography>
            </NavAppName>
          </Link>
        </UtilityFragment>

        {showGetStarted && (
          <Utility vFlex vJustifyContent="end" vFlexGrow vMarginLeft="auto">
            <Button onClick={onGetStarted} buttonSize="large">
              Get Started
            </Button>
          </Utility>
        )}
      </Nav>
    </UtilityFragment>
  )
}
