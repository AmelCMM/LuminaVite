import { Column, Container, Text, Row, Card, Button, Divider } from "@neuralumina/lumina-ui";
import { getUser } from "../store/appState.js";

export function Dashboard(forceUpdate) {
  const user = getUser();

  if (!user) {
    return Container({ className: "container fade-in" }, [
      Column({ gap: 24, style: { padding: "60px 0", textAlign: "center" } }, [
        Text("🔒", { size: 64 }),
        Text("Please log in to view your dashboard", { size: 20, color: "#6b7280" }),
        Button({ text: "Go to Home", variant: "primary", onClick: () => window.location.hash = "#" }),
      ]),
    ]);
  }

  return Container({ className: "container fade-in" }, [
    Column({ gap: 32, style: { padding: "40px 0" } }, [
      Text(`Welcome back, ${user.name}!`, { as: "h1", size: 36, weight: 700 }),
      Row({ gap: 20, style: { flexWrap: "wrap" } }, [
        Card({ title: "Total Revenue", description: "$47,283", icon: "💰", featured: true }),
        Card({ title: "Active Users", description: "1,234", icon: "👥" }),
        Card({ title: "Conversion Rate", description: "3.2%", icon: "📈" }),
        Card({ title: "Avg. Session", description: "4m 32s", icon: "⏱️" }),
      ]),
      Divider(),
      Column({ gap: 16 }, [
        Text("Recent Activity", { as: "h2", size: 24, weight: 700 }),
        Row({ gap: 12 }, [
          Button({ text: "View Analytics", variant: "secondary" }),
          Button({ text: "Export Data", variant: "secondary" }),
        ]),
      ]),
    ]),
  ]);
}