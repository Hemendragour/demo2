// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);



import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router base="/demo2">
    <App />
  </Router>
);