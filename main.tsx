import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";

try {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error('Root element not found');
  }
  createRoot(root).render(<App />);
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>Loading Error</h1><p>Failed to load the application. Please check the console for details.</p></div>';
}
  