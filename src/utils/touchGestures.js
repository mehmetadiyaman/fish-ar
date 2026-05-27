/**
 * Touch gesture handler for 3D model interaction.
 * ─────────────────────────────────────────────────
 * - 1 parmak sürükleme → model döndürme (rotate)
 * - 2 parmak pinch → model büyütme/küçültme (scale)
 * - 2 parmak sürükleme → model taşıma (pan)
 */

export function setupTouchGestures(containerEl, modelGroup) {
  if (!containerEl || !modelGroup) return () => {};

  let touchStartX = 0;
  let touchStartY = 0;
  let prevPinchDist = 0;
  let prevPanX = 0;
  let prevPanY = 0;
  let isSingleTouch = false;
  let isPinching = false;

  // Rotation sensitivity
  const ROTATE_SPEED = 0.008;
  // Scale limits
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 4.0;
  // Pan sensitivity
  const PAN_SPEED = 0.003;

  function getTouchDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getTouchCenter(t1, t2) {
    return {
      x: (t1.clientX + t2.clientX) / 2,
      y: (t1.clientY + t2.clientY) / 2,
    };
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isSingleTouch = true;
      isPinching = false;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      isSingleTouch = false;
      isPinching = true;
      prevPinchDist = getTouchDistance(e.touches[0], e.touches[1]);
      const center = getTouchCenter(e.touches[0], e.touches[1]);
      prevPanX = center.x;
      prevPanY = center.y;
    }
  }

  function onTouchMove(e) {
    e.preventDefault();

    if (isSingleTouch && e.touches.length === 1) {
      // ── Single finger → rotate ──
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      modelGroup.rotation.y += dx * ROTATE_SPEED;
      modelGroup.rotation.x += dy * ROTATE_SPEED;

      // Clamp X rotation to prevent flipping
      modelGroup.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, modelGroup.rotation.x)
      );

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    } else if (isPinching && e.touches.length === 2) {
      // ── Pinch → scale ──
      const newDist = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleFactor = newDist / prevPinchDist;

      const currentScale = modelGroup.scale.x;
      const newScale = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, currentScale * scaleFactor)
      );
      modelGroup.scale.setScalar(newScale);
      prevPinchDist = newDist;

      // ── Two-finger pan → translate ──
      const center = getTouchCenter(e.touches[0], e.touches[1]);
      const panDx = center.x - prevPanX;
      const panDy = center.y - prevPanY;

      modelGroup.position.x += panDx * PAN_SPEED;
      modelGroup.position.y -= panDy * PAN_SPEED; // invert Y

      prevPanX = center.x;
      prevPanY = center.y;
    }
  }

  function onTouchEnd(e) {
    if (e.touches.length === 0) {
      isSingleTouch = false;
      isPinching = false;
    } else if (e.touches.length === 1) {
      // Transitioned from 2 → 1 finger
      isSingleTouch = true;
      isPinching = false;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }

  // Double-tap to reset transforms
  let lastTapTime = 0;
  function onDoubleTap(e) {
    const now = Date.now();
    if (now - lastTapTime < 300 && e.touches.length === 1) {
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.scale.setScalar(1);
      modelGroup.position.set(0, 0, 0);
    }
    lastTapTime = now;
  }

  containerEl.addEventListener("touchstart", onTouchStart, { passive: false });
  containerEl.addEventListener("touchstart", onDoubleTap, { passive: true });
  containerEl.addEventListener("touchmove", onTouchMove, { passive: false });
  containerEl.addEventListener("touchend", onTouchEnd, { passive: true });
  containerEl.addEventListener("touchcancel", onTouchEnd, { passive: true });

  // Return cleanup function
  return () => {
    containerEl.removeEventListener("touchstart", onTouchStart);
    containerEl.removeEventListener("touchstart", onDoubleTap);
    containerEl.removeEventListener("touchmove", onTouchMove);
    containerEl.removeEventListener("touchend", onTouchEnd);
    containerEl.removeEventListener("touchcancel", onTouchEnd);
  };
}
