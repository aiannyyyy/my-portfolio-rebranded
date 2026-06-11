import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav"

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MobileNav />
      <div style={{ display:"flex" }}>
        <div className="desktop-sidebar">
          <Sidebar />
        </div>
        <main style={{ flex:1, minHeight:"100vh", backgroundColor:"var(--canvas)" }} className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
