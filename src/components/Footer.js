import { Container, Row, Column, Text, Divider } from "@chimuka_amel/lumina-ui";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return Container(
    {
      style: {
        backgroundColor: "#0d1b1f",
        color: "white",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      },
    },
    [
      Container({ className: "container", style: { padding: "48px 0 32px" } }, [
        // Main footer content
        Row(
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
              marginBottom: "32px",
            },
          },
          [
            // Brand column
            Column({ gap: 12 }, [
              Text("LuminaUI", {
                as: "h3",
                size: 20,
                weight: 900,
                style: {
                  background: "linear-gradient(135deg, #0f8f67, #246bfe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                },
              }),
              Text("Build beautiful web interfaces with zero dependencies.", {
                size: 14,
                color: "rgba(255,255,255,0.7)",
              }),
            ]),

            // Links column 1
            Column({ gap: 12 }, [
              Text("Product", {
                as: "h4",
                size: 16,
                weight: 700,
                color: "white",
              }),
              Text("Features", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Pricing", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Documentation", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
            ]),

            // Links column 2
            Column({ gap: 12 }, [
              Text("Company", {
                as: "h4",
                size: 16,
                weight: 700,
                color: "white",
              }),
              Text("About", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Blog", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Contact", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
            ]),

            // Links column 3
            Column({ gap: 12 }, [
              Text("Legal", {
                as: "h4",
                size: 16,
                weight: 700,
                color: "white",
              }),
              Text("Privacy", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Terms", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
              Text("Cookie Policy", {
                as: "a",
                href: "#",
                style: {
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  display: "block",
                  fontSize: 14,
                },
              }),
            ]),
          ],
        ),

        Divider({
          style: { backgroundColor: "rgba(255,255,255,0.1)", margin: "24px 0" },
        }),

        // Bottom bar
        Row(
          {
            mainAxisAlignment: "spaceBetween",
            style: {
              flexWrap: "wrap",
              gap: "16px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
            },
          },
          [
            Text(`© ${currentYear} LuminaUI. All rights reserved.`),
            Text("Made with ❤️ using vanilla JavaScript", {
              style: { textAlign: "right" },
            }),
          ],
        ),
      ]),
    ],
  );
}
