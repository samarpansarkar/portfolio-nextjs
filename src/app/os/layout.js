// Minimal OS layout — no html/body tags (root layout handles those)
// Just hides the main layout's scrollbar and padding for the full-screen OS experience
export const metadata = {
  title: "Sarkar OS v95.01 — Virtual Desktop",
  description: "An immersive Windows-95 style retro virtual desktop built by Samarpan Sarkar.",
};

export default function OSLayout({ children }) {
  return <>{children}</>;
}
