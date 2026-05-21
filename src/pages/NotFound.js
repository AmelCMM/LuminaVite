// Add to your pages folder
// src/pages/NotFound.js
import { Column, Container, Text, Button } from "@neuralumina/lumina-ui";

export function NotFound() {
  return Container({ className: "container fade-in" }, [
    Column({ gap: 24, style: { textAlign: "center", padding: "80px 0" } }, [
      Text("404", { size: 72, weight: 900, style: { color: "#0f8f67" } }),
      Text("Page Not Found", { as: "h1", size: 32, weight: 700 }),
      Text("The page you're looking for doesn't exist or has been moved.", {
        color: "#6b7280",
      }),
      Button({ text: "Go Home", onClick: () => (window.location.hash = "#") }),
    ]),
  ]);
}
