import { useState } from "react";
import FISH_LIST from "./data/fishConfig.js";
import StartScreen from "./components/StartScreen.jsx";
import ARScene from "./components/ARScene.jsx";

export default function App() {
  const [selectedFish, setSelectedFish] = useState(null);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {!selectedFish ? (
        <StartScreen
          fishList={FISH_LIST}
          onSelectFish={(fish) => setSelectedFish(fish)}
        />
      ) : (
        <ARScene
          fish={selectedFish}
          onStop={() => setSelectedFish(null)}
        />
      )}
    </div>
  );
}
