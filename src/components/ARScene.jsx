import { useEffect, useRef, useState, useCallback } from "react";
import LoadingOverlay from "./LoadingOverlay.jsx";
import FishInfoCard from "./FishInfoCard.jsx";
import { setupTouchGestures } from "../utils/touchGestures.js";

export default function ARScene({ fish, onStop }) {
  const containerRef = useRef(null);
  const mindarRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const cleanupGesturesRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [tracked, setTracked] = useState(false);

  const cleanup = useCallback(() => {
    // Remove touch gestures
    if (cleanupGesturesRef.current) {
      cleanupGesturesRef.current();
      cleanupGesturesRef.current = null;
    }

    // Cancel animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Stop MindAR
    if (mindarRef.current) {
      try {
        mindarRef.current.stop();
      } catch (_) {
        /* already stopped */
      }
      mindarRef.current = null;
    }

    // Dispose Three.js renderer
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Stop all camera streams
    const videos = containerRef.current?.querySelectorAll("video");
    videos?.forEach((v) => {
      v.srcObject?.getTracks().forEach((t) => t.stop());
      v.srcObject = null;
    });

    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const startAR = async () => {
      try {
        // Dynamic imports – tree-shaken & code-split
        const [{ MindARThree }, THREE, { GLTFLoader }] = await Promise.all([
          import("mind-ar/dist/mindar-image-three.prod.js"),
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
        ]);

        if (cancelled) return;

        // ── MindAR setup ──────────────────────────────────────
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: fish.mind,
          maxTrack: 1,
          uiLoading: "no",
          uiScanning: "no",
          uiError: "no",
          filterMinCF: 0.0001,
          filterBeta: 1000,
        });

        mindarRef.current = mindarThree;

        const { renderer, scene, camera } = mindarThree;
        rendererRef.current = renderer;

        // Renderer quality settings (perf-optimised for mobile)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // ── Lighting ──────────────────────────────────────────
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
        dirLight.position.set(0.5, 1, 0.8);
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-0.5, 0.5, -0.5);
        scene.add(fillLight);

        const hemiLight = new THREE.HemisphereLight(0xb0d0ff, 0x303030, 0.8);
        scene.add(hemiLight);

        // ── Anchor (image target 0) ───────────────────────────
        const anchor = mindarThree.addAnchor(0);

        // Track target found/lost for UI hints
        anchor.onTargetFound = () => setTracked(true);
        anchor.onTargetLost = () => setTracked(false);

        // ── Load GLB ──────────────────────────────────────────
        const loader = new GLTFLoader();

        const gltf = await new Promise((resolve, reject) => {
          loader.load(
            fish.glb,
            resolve,
            (xhr) => {
              if (xhr.lengthComputable) {
                setProgress((xhr.loaded / xhr.total) * 100);
              }
            },
            reject
          );
        });

        if (cancelled) return;

        const model = gltf.scene;

        // Auto-scale model to configured size
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = fish.modelScale || 0.55;
        const scale = desiredSize / maxDim;
        model.scale.setScalar(scale);

        // Center model on anchor
        box.setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        // Wrap model in a gesture group (user transforms go here)
        const gestureGroup = new THREE.Group();
        gestureGroup.add(model);
        anchor.group.add(gestureGroup);

        // ── Setup touch gestures ──────────────────────────────
        cleanupGesturesRef.current = setupTouchGestures(
          containerRef.current,
          gestureGroup
        );

        // ── Handle animations if any ─────────────────────────
        let mixer = null;
        if (gltf.animations?.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }

        // ── Start MindAR ──────────────────────────────────────
        await mindarThree.start();

        if (cancelled) {
          cleanup();
          return;
        }

        setLoading(false);

        // ── Render loop ───────────────────────────────────────
        const clock = new THREE.Clock();
        const render = () => {
          rafRef.current = requestAnimationFrame(render);
          const delta = clock.getDelta();
          if (mixer) mixer.update(delta);
          renderer.render(scene, camera);
        };
        render();
      } catch (err) {
        console.error("AR Error:", err);
        if (!cancelled) {
          setError(err.message || "AR başlatılamadı");
          setLoading(false);
        }
      }
    };

    startAR();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [fish, cleanup]);

  // ── Error UI ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">Bir Hata Oluştu</h2>
        <p className="text-sm text-gray-400 max-w-xs">{error}</p>
        <button
          id="error-back-button"
          onClick={onStop}
          className="mt-4 px-6 py-3 rounded-xl bg-white/10 text-white font-medium active:scale-95 transition-transform cursor-pointer"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* AR container – MindAR injects canvas + video here */}
      <div
        ref={containerRef}
        id="ar-container"
        className="w-full h-full"
      />

      {loading && <LoadingOverlay progress={progress} fishName={fish.name} />}

      {/* Back button */}
      {!loading && (
        <button
          id="ar-back-button"
          onClick={() => {
            cleanup();
            onStop();
          }}
          className="absolute top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform cursor-pointer safe-top"
          aria-label="Geri dön"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Fish info card (top right) */}
      {!loading && <FishInfoCard fish={fish} visible={tracked} />}

      {/* Scanning hint overlay */}
      {!loading && (
        <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none safe-bottom">
          <div className="px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            {!tracked ? (
              <p className="text-xs text-white/80 text-center">
                📷 Görsele kamerayı tutun
              </p>
            ) : (
              <p className="text-xs text-white/60 text-center">
                👆 Döndür · 🤏 Büyüt/Küçült · ✌️ Taşı · 2× Sıfırla
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
