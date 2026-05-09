import { Column, Container, Text, Button, Row, Wrap } from "@chimuka_amel/lumina-ui";
import { Card } from "../components/Card.js";

const features = [
  { title: "Zero Dependencies", description: "No npm audit nightmares. No supply chain risks.", icon: "🔒", featured: true },
  { title: "Flutter-Inspired", description: "Column, Row, Container — familiar and predictable.", icon: "🎯" },
  { title: "Built-in State", description: "useState and createStore for reactive UIs.", icon: "⚡" },
  { title: "No Build Step", description: "Open index.html and it runs — but Vite makes it faster.", icon: "🚀" },
];

export function Home() {
  return Container({ className: "container fade-in" }, [
    Column({ gap: 48, style: { padding: "40px 0" } }, [
      // Hero section
      Column({ gap: 20, style: { textAlign: "center" } }, [
        Text("LuminaUI", {
          as: "h1",
          size: 64,
          weight: 900,
          style: { background: "linear-gradient(135deg, #0f8f67, #246bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
        }),
        Text("Production-ready. Zero dependencies. Pure JavaScript.", {
          size: 20,
          color: "#6b7280",
        }),
        Row({ gap: 16, style: { justifyContent: "center", marginTop: 16 } }, [
          Button({ text: "Get Started", variant: "primary" }),
          Button({ text: "Documentation", variant: "secondary" }),
        ]),
      ]),
      // Features grid
      Column({ gap: 24 }, [
        Text("Why LuminaUI?", { as: "h2", size: 32, weight: 700, style: { textAlign: "center" } }),
        Wrap({ gap: 20, style: { justifyContent: "center" } }, [
          ...features.map((feature) => Card({ ...feature })),
        ]),
      ]),
    ]),
  ]);
}