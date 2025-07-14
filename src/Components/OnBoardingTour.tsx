import { Card, CardBody } from "@/Components/UI/card";
import { Button, Typography, Utility } from "@visa/nova-react";

interface OnboardingTourProps {
  onClose: () => void;
}

export function OnboardingTour({ onClose }: OnboardingTourProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 480 }}>
        <CardBody>
          <Utility vFlex vFlexCol vGap={16}>
            <Typography variant="headline-3" style={{ textAlign: "center" }}>
              👋 Welcome to the Component Suggestion Tool!
            </Typography>

            <Typography variant="body-2" style={{ textAlign: "center", lineHeight: 1.6 }}>
              Describe your UI in natural language like
              <br />
              <Typography as="span" variant="subtitle-1" colorScheme="active" >
                "Responsive login form with remember me"
              </Typography>
              and get ready-to-use code from the Visa Design System.
            </Typography>

            <Utility vFlex vJustifyContent="center" vAlignItems="center">
              <Button onClick={onClose}>Got it, let&apos;s go!</Button>
            </Utility>
          </Utility>
        </CardBody>
      </Card>
    </div>
  );
}
