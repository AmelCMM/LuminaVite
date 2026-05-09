import { Card as LuminaCard, Column, Text } from "@chimuka_amel/lumina-ui";

export function Card({ title, description, icon, onClick, featured = false }) {
  return LuminaCard({
    padding: 24,
    elevation: featured ? 3 : 1,
    style: {
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.2s, box-shadow 0.2s",
      background: featured ? "linear-gradient(135deg, #0f8f67, #246bfe)" : "white",
      color: featured ? "white" : "inherit",
    },
    onClick,
  }, [
    Column({ gap: 12 }, [
      icon && Text(icon, { size: 32 }),
      Text(title, { as: "h3", size: 20, weight: 700 }),
      description && Text(description, { color: featured ? "rgba(255,255,255,0.9)" : "#6b7280" }),
    ]),
  ]);
}