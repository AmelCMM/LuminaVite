// src/pages/UserProfile.js
import { Column, Container, Text, Card } from "@chimuka_amel/lumina-ui";

export function UserProfile({ params, query }) {
  const userId = params.id;
  const tab = query.tab || "posts";

  return Container({ className: "container" }, [
    Column({ gap: 24, style: { padding: "40px 0" } }, [
      Text(`User Profile: ${userId}`, { as: "h1", size: 32, weight: 700 }),
      Text(`Active tab: ${tab}`, { color: "#6b7280" }),
      Card({ padding: 24 }, [Text(`Showing ${tab} for user ${userId}`)]),
    ]),
  ]);
}

// Register with router:
// routes: { "/users/:id": UserProfile }
// URL: http://localhost:5173/#/users/123?tab=comments
// params: { id: "123" }, query: { tab: "comments" }
