import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Search, Menu, X, Monitor } from "lucide-react";
import logo from "../assets/GitScope-icon.png";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

const nextTheme = { dark: "light", light: "system", system: "dark" };
const themeIcon = {
  dark: <Moon size={18} />,
  light: <Sun size={18} />,
  system: <Monitor size={18} />,
};

const Navbar = ({
  onMenuClick,menuOpen,fetchUser,userData,theme,setTheme,autoSearch,
}) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spin, setSpin] = useState(false);
  const [searchPop, setSearchPop] = useState(false);
  const logoRef = useRef(null);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleThemeToggle = () => {
    setSpin(true);
    setTheme((t) => nextTheme[t]);
    setTimeout(() => setSpin(false), 500);
  };

  const handleLogoMove = (e) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(500px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg)`;
  };
  const handleLogoLeave = () => {
    if (logoRef.current) logoRef.current.style.transform = "";
  };

  // 3D tilt on the whole search box based on mouse position
  const handleSearchBoxMove = (e) => {
    const el = searchBoxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(6px)`;
  };
  const handleSearchBoxLeave = () => {
    if (searchBoxRef.current) searchBoxRef.current.style.transform = "";
  };

  const magneticMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const magneticReset = (e) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };
  // Navbar.jsx — add clicked state and apply it on click

  const [btnClicked, setBtnClicked] = useState(false);

  const handleSearch = async () => {
    const query = search.trim();
    if (!query || loading) return;
    setBtnClicked(true);
    setTimeout(() => setBtnClicked(false), 500);
    setAnimate(true);
    setLoading(true);
    setSearchPop(true);
    try {
      await fetchUser(query);
      setSearch("");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setAnimate(false);
      setTimeout(() => setSearchPop(false), 500);
    }
  };
  return (
    <nav className={`navbar navbar-enter${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-left">
        <button
          onClick={onMenuClick}
          className="mobile-menu-btn"
          onMouseMove={magneticMove}
          onMouseLeave={magneticReset}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="logo-section">
          <span
            ref={logoRef}
            className="logo-icon logo-icon-3d"
            onMouseMove={handleLogoMove}
            onMouseLeave={handleLogoLeave}
          >
            <img src={logo} alt="GitScope logo" />
          </span>
          <div>
            <h1 className="logo-title">GitScope</h1>
            <p className="logo-sub">Explore profiles</p>
          </div>
        </div>
      </div>

      <div className="navbar-center">
        <div
          ref={searchBoxRef}
          onMouseMove={handleSearchBoxMove}
          onMouseLeave={handleSearchBoxLeave}
          className={`search-box search-box-3d${animate ? " animating loading" : ""}${searchPop ? " search-pop" : ""}`}
        >
          <span className="search-sweep" aria-hidden="true" />
          <span className="search-icon-wrap">
            <Search size={18} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && autoSearch && !loading) handleSearch();
            }}
            placeholder="Search GitHub user…"
            className="search-input search-input-anim"
          />
          <span className="search-shortcut">⌘K</span>
          <button
            className={`search-btn search-btn-3d${btnClicked ? " clicked" : ""}`}
            onClick={handleSearch}
            disabled={loading || !search.trim()}
            onMouseMove={magneticMove}
            onMouseLeave={magneticReset}
          >
            {loading ? (
              <span className="dot-loader">
                <span />
                <span />
                <span />
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      <div className="navbar-right">
        {userData && (
          <div className="nav-profile">
            <div className="nav-avatar-wrap">
              <span className="nav-avatar-ring" />
              <img
                src={userData.avatar_url}
                className="nav-avatar"
                alt={userData.login}
              />
            </div>
            <span className="nav-login">{userData.login}</span>
          </div>
        )}
        <button
          onClick={handleThemeToggle}
          className={`icon-btn${spin ? " spin" : ""}`}
          onMouseMove={magneticMove}
          onMouseLeave={magneticReset}
        >
          <span className="theme-icon-inner">{themeIcon[theme]}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
