import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

const app = <App />;

createRoot(rootElement).render(
  import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app
);
