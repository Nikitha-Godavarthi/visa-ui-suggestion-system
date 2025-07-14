import { useState, useEffect } from "react";

export function useOnboardingTour() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenTour");
    if (!seen) {
      setShowTour(true);
    }
  }, []);

  const dismissTour = () => {
    localStorage.setItem("hasSeenTour", "true");
    setShowTour(false);
  };

  return { showTour, dismissTour };
}
