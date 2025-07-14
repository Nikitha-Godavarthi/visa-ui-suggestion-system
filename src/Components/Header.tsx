"use client"

import {
  Button,
  Link,
  Nav,
  NavAppName,
  Typography,
  Utility,
  UtilityFragment,
  VisaLogo,
} from "@visa/nova-react"

interface HeaderProps {
  showGetStarted?: boolean
  onGetStarted?: () => void
  onGoHome?: () => void
}

export function Header({ showGetStarted = false, onGetStarted, onGoHome }: HeaderProps) {
  return (
    <UtilityFragment vJustifyContent="between">
      <Nav orientation="horizontal" tag="header">
        <UtilityFragment vFlex vGap={16}>
          <Link
            aria-label="Visa Design System Home"
            onClick={onGoHome}
            noUnderline
            style={{ backgroundColor: "transparent", cursor: "pointer" }}
          >
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
