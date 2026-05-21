import { Row, Container, Text, Button } from "@neuralumina/lumina-ui";
import { getTheme, toggleTheme, getUser, logout } from "../store/appState.js";

export function Header(forceUpdate) {
  const theme = getTheme();
  const user = getUser();

  return Container({ className: "container" }, [
    Row({
      mainAxisAlignment: "spaceBetween",
      style: { padding: "20px 0", alignItems: "center" },
    }, [
      // Logo
      Text("LuminaUI", {
        as: "h1",
        size: 24,
        weight: 900,
        style: { background: "linear-gradient(135deg, #0f8f67, #246bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
      }),
      // Navigation + Actions
      Row({ gap: 16, style: { alignItems: "center" } }, [
        Text("Home", { as: "a", href: "#", style: { textDecoration: "none" } }),
        Text("Dashboard", { as: "a", href: "#dashboard", style: { textDecoration: "none" } }),
        Button({
          text: theme === "light" ? "🌙" : "☀️",
          variant: "text",
          onClick: toggleTheme,
          style: { fontSize: 20 },
        }),
        user
          ? Row({ gap: 8 }, [
              Text(`👋 ${user.name}`),
              Button({ text: "Logout", variant: "secondary", onClick: logout }),
            ])
          : Button({
              text: "Login",
              onClick: () => alert("Demo login — implement your auth flow"),
            }),
      ]),
    ]),
  ]);
}