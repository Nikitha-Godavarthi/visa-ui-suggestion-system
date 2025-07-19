"use client"

import {
  Link,
  Nav,
  NavAppName,
  Typography,
  Utility,
  UtilityFragment,
  VisaLogo,
  DropdownButton,
  Listbox,
  ListboxItem,
  Avatar,
  TabSuffix,
  DropdownMenu,
} from "@visa/nova-react"
import { VisaAccountLow, VisaChevronUpTiny, VisaChevronDownTiny } from "@visa/nova-icons-react"
import {
  autoUpdate,
  offset,
  FloatingFocusManager,
  useClick,
  useFloating,
  useInteractions,
  useDismiss,
} from "@floating-ui/react"
import { type CSSProperties, useState, useEffect } from "react"

interface HeaderProps {
  showGetStarted?: boolean
  onGetStarted?: () => void
  onGoHome?: () => void
  onNavigate: (path: string) => void
}

export function Header({ onGoHome, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const refreshLoginStatus = () => {
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    const token = localStorage.getItem("token")

    if (email && token) {
      setUserEmail(email)
      setUserName(name || "")
      setIsLoggedIn(true)
    } else {
      setUserEmail("")
      setUserName("")
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    refreshLoginStatus()

    // Listen for loginStatus changes across tabs or pages
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loginStatus") {
        refreshLoginStatus()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(4)],
    open: menuOpen,
    onOpenChange: setMenuOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

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

        <Utility vFlex vJustifyContent="end" vFlexGrow vMarginLeft="auto">
          <DropdownButton
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "profile-dropdown-menu" : undefined}
            aria-label="Profile"
            buttonSize="large"
            colorScheme="tertiary"
            element={<Avatar tag="button" />}
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <VisaAccountLow style={{ width: 24, height: 24 }} />
            <TabSuffix
              element={
                menuOpen ? (
                  <VisaChevronUpTiny style={{ width: 24, height: 24 }} />
                ) : (
                  <VisaChevronDownTiny style={{ width: 24, height: 24 }} />
                )
              }
            />
          </DropdownButton>

          {menuOpen && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1} restoreFocus={true}>
              <DropdownMenu
                id="profile-dropdown-menu"
                aria-hidden={!menuOpen}
                ref={refs.setFloating}
                style={
                  {
                    marginTop: "5px",
                    inlineSize: "210px",
                    position: "absolute",
                    ...floatingStyles,
                    zIndex: 1,
                  } as CSSProperties
                }
                {...getFloatingProps()}
              >
                <Listbox>
                  {isLoggedIn ? (
                    <>
                      <li>
                        <div
                          style={{
                            padding: "8px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Typography variant="body-2" colorScheme="default">
                            {userName}
                          </Typography>
                          <Typography variant="body-3" colorScheme="default">
                            {userEmail}
                          </Typography>
                        </div>
                      </li>
                      <li>
                          <ListboxItem
                            tag="button"
                            onClick={() => {
                              onNavigate("/app")
                              setMenuOpen(false)
                            }}
                          >
                            Dashboard
                          </ListboxItem>
                        </li>
                      <li>
                          <ListboxItem
                            tag="button"
                            onClick={() => {
                              onNavigate("/favorites")
                              setMenuOpen(false)
                            }}
                          >
                            Your Favorites
                          </ListboxItem>
                        </li>

                      <li>
                        <ListboxItem
                          tag="button"
                          onClick={() => {
                            localStorage.removeItem("token")
                            localStorage.removeItem("userEmail")
                            localStorage.removeItem("userName")
                            localStorage.setItem("loginStatus", Date.now().toString())
                            setMenuOpen(false)
                            onNavigate("/signin")
                          }}
                        >
                          Logout
                        </ListboxItem>
                      </li>
                    </>
                  ) : (
                    <li>
                      <ListboxItem
                        tag="button"
                        onClick={() => {
                          onNavigate("/signin")
                          setMenuOpen(false)
                        }}
                      >
                        Sign In / Sign Up
                      </ListboxItem>
                    </li>
                  )}
                </Listbox>

              </DropdownMenu>
            </FloatingFocusManager>
          )}
        </Utility>
      </Nav>
    </UtilityFragment>
  )
}
