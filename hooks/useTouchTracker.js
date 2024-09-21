import { useState } from "react";

function useTouchTracking(handleClick) {
  const [touchInfo, setTouchInfo] = useState({
    touches: 0,
    touchPoints: [],
    touchCount: 0,
    activeTouches: new Set(),
  });

  const handleTouchStart = (e) => {
    const newActiveTouches = new Set(touchInfo.activeTouches);

    Array.from(e.touches).forEach((touch) => {
      newActiveTouches.add(touch.identifier);
    });

    setTouchInfo((prevInfo) => ({
      touches: e.touches.length,
      touchPoints: Array.from(e.touches).map((touch) => ({
        clientX: touch.clientX,
        clientY: touch.clientY,
        identifier: touch.identifier,
      })),
      touchCount:
        prevInfo.touchCount +
        newActiveTouches.size - prevInfo.activeTouches.size,
      activeTouches: newActiveTouches,
    }));
  };

  const handleTouchMove = (e) => {
    setTouchInfo((prevInfo) => ({
      touches: e.touches.length,
      touchPoints: Array.from(e.touches).map((touch) => ({
        clientX: touch.clientX,
        clientY: touch.clientY,
        identifier: touch.identifier,
      })),
      touchCount: prevInfo.touchCount,
      activeTouches: prevInfo.activeTouches,
    }));
  };

  const handleTouchEnd = (e) => {
    const remainingTouches = new Set(touchInfo.activeTouches);

    Array.from(e.changedTouches).forEach((touch) => {
      remainingTouches.delete(touch.identifier);
    });

    setTouchInfo((prevInfo) => ({
      touches: 0,
      touchPoints: [],
      touchCount: prevInfo.touchCount,
      activeTouches: remainingTouches,
    }));

    // Now call the setter only when the touch ends
    if (touchInfo.touches > 0) {
      handleClick(touchInfo.touches)
    }
  };

  return { touchInfo, handleTouchStart, handleTouchMove, handleTouchEnd };
}

export default useTouchTracking;
