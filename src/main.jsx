import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContactApp from "./ContactApp";
const rootElement=document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ContactApp />
  </StrictMode>
);
