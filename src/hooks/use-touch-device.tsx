import * as React from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const hasTouch =
      (typeof window !== "undefined" && "ontouchstart" in window) ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
    setIsTouch(hasTouch);
  }, []);

  return isTouch;
}

