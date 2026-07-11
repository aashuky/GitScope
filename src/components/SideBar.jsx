import { NavLink } from "react-router-dom";
import { Home, Settings, GitFork, GitCompare, Zap, ChevronRight } from "lucide-react";

const navItems = [
  { icon: Home,       label: "Home",          to: "/" },
  { icon: GitFork,    label: "Repositories",  to: "/repositories" },
  { icon: GitCompare, label: "Compare users", to: "/compare" },
  { icon: Zap,        label: "Quick actions", to: "/quick-actions" },
  { icon: Settings,   label: "Settings",      to: "/settings" },
];

const SideBar = ({ menuOpen, onClose }) => (
  <>
    {menuOpen && <div className="sidebar-backdrop lg:hidden" onClick={onClose} />}

    <div className={`mobile-sidebar lg:hidden${menuOpen ? " open" : ""}`}>
      {navItems.map(({ icon: Icon, label, to }, i) => (
        <NavLink key={label} to={to} end={to === "/"} onClick={onClose}
          className={({ isActive }) => `mob-nav-link${isActive ? " active" : ""}`}
          style={{ animationDelay: `${i * 55}ms` }}>
          <span className="mob-icon-wrap"><Icon size={18} /></span>
          <span className="mob-nav-label">{label}</span>
        </NavLink>
      ))}
    </div>

    <aside className="desktop-sidebar">
      <div className="sb-logo-row">
        <div className="sb-logo-icon">GS</div>
        <div>
          <p className="sb-logo-name">GitHub Finder</p>
          <p className="sb-logo-sub">Developer search</p>
        </div>
      </div>

      <nav className="sb-nav">
        {navItems.map(({ icon: Icon, label, to }, i) => (
          <NavLink key={label} to={to} end={to === "/"}
            className={({ isActive }) => `sb-link${isActive ? " active" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}>
            <span className="sb-bar" />
            <span className="sb-icon"><Icon size={18} /></span>
            <span className="sb-label">{label}</span>
            <ChevronRight size={14} className="sb-arrow" />
          </NavLink>
        ))}
      </nav>

      <div className="sb-footer">
        <p className="sb-footer-title">Quick tip</p>
        <p className="sb-footer-sub">Press enter in search to look up a profile instantly.</p>
      </div>
    </aside>
  </>
);

export default SideBar;