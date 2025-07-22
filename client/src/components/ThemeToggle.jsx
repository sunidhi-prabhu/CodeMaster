import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle dark/light mode"
      style={{
        background: "none", border: "none", fontSize: 24,
        color: "var(--accent)", cursor: "pointer", marginLeft: 10
      }}
    >
      {theme === "dark" ? "🌞" : "🌜"}
    </button>
  );
}
