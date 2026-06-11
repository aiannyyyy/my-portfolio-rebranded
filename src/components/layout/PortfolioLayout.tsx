import Sidebar from "./Sidebar"

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Offset content by sidebar width */}
      <main className="ml-64 flex-1 min-h-screen" style={{ backgroundColor: "var(--canvas)" }}>
        {children}
      </main>
    </div>
  )
}