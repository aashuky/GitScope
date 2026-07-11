import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { accents } from "./constants/Accents";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import RepositoriesPage from "./pages/RepositoriesPage";
import ComparePage from "./pages/ComparePage";
import QuickActions from "./pages/QuickActionsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RouteMemory from "./components//routing/RouteMemory";
import InitialRedirect from "./components/routing/InitialRedirect";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const HEADERS = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
const hasToken = Boolean(TOKEN);

const githubApi = axios.create({ headers: HEADERS });

function lighten(hex, amount) {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const num = parseInt(cleanHex, 16);
  const r = Math.min(255, ((num >> 16) & 255) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 255) + Math.round(255 * amount));
  const b = Math.min(255, (num & 255) + Math.round(255 * amount));

  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function applyAccent(id) {
  const found = accents.find((a) => a.id === id);
  if (!found) return;

  const root = document.documentElement;
  root.style.setProperty("--accent-from", found.from);
  root.style.setProperty("--accent-to", found.to);
  root.style.setProperty("--accent-dark", found.from);
  root.style.setProperty("--accent-tint", lighten(found.from, 0.35));
  root.style.setProperty("--indigo-tint", lighten(found.to, 0.3));
}

function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark", "theme-system");

  // Strict Sanitization
  if (typeof theme !== "string" || theme.includes(" ") || theme.includes("(")) {
    body.classList.add("theme-dark");
    return;
  }

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    body.classList.add(prefersDark ? "theme-dark" : "theme-light");
  } else {
    body.classList.add(`theme-${theme}`);
  }
}

const App = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("gf-theme");
    return saved || "dark";
  });

  const [accentColor, setAccentColorState] = useState(
    () => localStorage.getItem("gf-accent") || "purple",
  );
  const [compactView, setCompactView] = useState(
    () => localStorage.getItem("gf-compact") === "true",
  );
  const [autoSearch, setAutoSearch] = useState(
    () => localStorage.getItem("gf-autosearch") !== "false",
  );

  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [contributions, setContributions] = useState(null);
  const [topRepos, setTopRepos] = useState([]);

  const [landingError, setLandingError] = useState("");
  const [landingLoading, setLandingLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Splash Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashLeaving(true);
      setTimeout(() => setSplashDone(true), 520);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Theme Synchronizer with live system-preference tracking
  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Accent Tracker
  useEffect(() => {
    applyAccent(accentColor);
  }, [accentColor]);

  const setTheme = useCallback((value) => {
    setThemeState((prevTheme) => {
      const nextTheme = typeof value === "function" ? value(prevTheme) : value;
      localStorage.setItem("gf-theme", nextTheme);
      return nextTheme;
    });
  }, []);

  const setAccentColor = useCallback((id) => {
    setAccentColorState(id);
    localStorage.setItem("gf-accent", id);
  }, []);

  const handleSetCompact = (value) => {
    setCompactView(value);
    localStorage.setItem("gf-compact", value);
  };

  const handleSetAutoSearch = (value) => {
    setAutoSearch(value);
    localStorage.setItem("gf-autosearch", value);
  };

  const loadUser = useCallback(async (login, saveToStorage = true) => {
    const fetchAllRepos = async () => {
      let allRepos = [];
      let page = 1;
      const perPage = 100;

      while (true) {
        const res = await githubApi.get(
          `https://api.github.com/users/${login}/repos`,
          {
            params: {
              per_page: perPage,
              page,
              sort: "pushed",
            },
          },
        );
        allRepos = [...allRepos, ...res.data];
        if (res.data.length < perPage) break;
        page++;
      }

      return allRepos;
    };

    const [userRes, repoData, activityRes] = await Promise.all([
      githubApi.get(`https://api.github.com/users/${login}`),
      fetchAllRepos(),
      githubApi.get(
        `https://api.github.com/users/${login}/events/public?per_page=30`,
      ),
    ]);

    const user = userRes.data;
    const activityData = activityRes.data;

    setUserData(user);
    setRepos(repoData);
    setActivity(activityData);
    setTopRepos(
      [...repoData]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5),
    );

    if (saveToStorage) {
      localStorage.setItem("gf-user", JSON.stringify({ login: user.login }));
    }

    return user;
  }, []);

  const handleLandingSearch = async (login) => {
    setLandingLoading(true);
    setLandingError("");
    try {
      await loadUser(login);
      localStorage.setItem("gf-last-path", "/");
      setAppReady(true);
    } catch (err) {
      console.error(err);
      setLandingError(
        "User not found. Please check the username and try again.",
      );
      setUserData(null);
    } finally {
      setLandingLoading(false);
    }
  };

  const handleNavbarSearch = async (login) => {
    try {
      await loadUser(login);
    } catch (err) {
      console.error(err);
      alert("GitHub user not found.");
      setUserData(null);
      setRepos([]);
      setActivity([]);
      setTopRepos([]);
    }
  };

  if (!splashDone) return <SplashScreen leaving={splashLeaving} />;

  return (
    <>
      <ScrollToTop />
      <RouteMemory />
      <InitialRedirect />
      <div className={`app${compactView ? " compact" : ""}`}>
        <Navbar
          fetchUser={handleNavbarSearch}
          userData={userData}
          theme={theme}
          setTheme={setTheme}
          onMenuClick={() => setMenuOpen((prev) => !prev)}
          menuOpen={menuOpen}
          autoSearch={autoSearch}
        />

        <div className="app-body">
          <SideBar menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    userData={userData}
                    repos={repos}
                    activity={activity}
                    contributions={contributions}
                    topRepos={topRepos}
                    hasToken={hasToken}
                  />
                }
              />
              <Route
                path="/repositories"
                element={<RepositoriesPage userData={userData} repos={repos} />}
              />
              <Route path="/compare" element={<ComparePage />} />
              <Route
                path="/quick-actions"
                element={<QuickActions userData={userData} repos={repos} />}
              />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    theme={theme}
                    setTheme={setTheme}
                    accentColor={accentColor}
                    setAccentColor={setAccentColor}
                    compactView={compactView}
                    setCompactView={handleSetCompact}
                    autoSearch={autoSearch}
                    setAutoSearch={handleSetAutoSearch}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
