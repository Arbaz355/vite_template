import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <div className="flex justify-center gap-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="transition duration-300 hover:opacity-80"
        >
          <img
            src={viteLogo}
            className="h-24 p-6 transition-all hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.6)]"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="transition duration-300 hover:opacity-80"
        >
          <img
            src={reactLogo}
            className="h-24 p-6 animate-[spin_20s_linear_infinite] transition-all hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.6)]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold my-4">Vite + React</h1>
      <div className="p-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
