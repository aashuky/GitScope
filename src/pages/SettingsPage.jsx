import {
  Settings,
  Palette,
  BarChart2,
  Zap,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Monitor,
  Code2,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { accents } from "../constants/accents.js";

const themes = [
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "light", label: "Light", Icon: Sun },
  { id: "system", label: "System", Icon: Monitor },
];

const Section = ({ title, children }) => (
  <div className="settings-section">
    <h3 className="settings-section-label">{title}</h3>
    <div className="settings-section-body">{children}</div>
  </div>
);

const Row = ({ icon: Icon, iconBg, label, sub, right, onClick, danger }) => (
  <button onClick={onClick} className="settings-row">
    <span
      className="settings-row-icon"
      style={{
        background: danger
          ? "linear-gradient(135deg,#dc2626,#b91c1c)"
          : iconBg ||
            "linear-gradient(135deg,var(--accent-from),var(--accent-to))",
      }}
    >
      <Icon size={16} color="#fff" />
    </span>
    <span className="settings-row-text">
      <p className={`settings-row-label${danger ? " danger" : ""}`}>{label}</p>
      {sub && <p className="settings-row-sub">{sub}</p>}
    </span>
    {right ?? (
      <ChevronRight
        size={16}
        className={danger ? "settings-row-arrow danger" : "settings-row-arrow"}
      />
    )}
  </button>
);

const Toggle = ({ value, onChange }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onChange(!value);
    }}
    className={`settings-toggle ${value ? "on" : "off"}`}
  >
    <span className="toggle-knob" />
  </button>
);

const SettingsPage = ({
  theme,
  setTheme,
  accentColor,
  setAccentColor,
  compactView,
  setCompactView,
  autoSearch,
  setAutoSearch,
}) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="dashboard-container">
      <div className="settings-wrap">
        <div className="settings-header">
          <div className="sec-icon settings-header-icon">
            <Settings size={22} />
          </div>
          <div>
            <h2 className="settings-header-title">Settings</h2>
            <p className="settings-header-sub">
              Manage your preferences and appearance
            </p>
          </div>
        </div>

        <div className="settings-grid">
          <div>
            <Section title="Appearance">
              <div className="settings-card-bg">
                <div className="settings-theme-row">
                  <span className="sec-icon settings-theme-icon">
                    <Palette size={16} />
                  </span>
                  <div>
                    <p className="settings-theme-title">Theme</p>
                    <p className="settings-theme-sub">
                      Choose your colour scheme
                    </p>
                  </div>
                </div>
                <div className="settings-theme-grid">
                  {themes.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setTheme(id)}
                      className={`settings-theme-btn${theme === id ? " active" : ""}`}
                    >
                      <Icon size={17} />
                      {label}
                      {theme === id && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="settings-card-bg settings-accent-card">
                <p className="settings-theme-title">Accent colour</p>
                <p className="settings-theme-sub settings-accent-sub">
                  Recolours buttons, links and highlights across the app
                </p>
                <div className="settings-accent-grid">
                  {accents.map(({ id, from, to }) => (
                    <button
                      key={id}
                      onClick={() => setAccentColor(id)}
                      className={`settings-accent-dot${accentColor === id ? " active" : ""}`}
                      style={{
                        background: `linear-gradient(135deg,${from},${to})`,
                      }}
                    >
                      {accentColor === id && <Check size={14} color="#fff" />}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Display">
              <Row
                icon={BarChart2}
                label="Compact view"
                sub="Reduce card padding and spacing"
                right={<Toggle value={compactView} onChange={setCompactView} />}
              />
              <Row
                icon={Zap}
                label="Auto-search on enter"
                sub="Trigger search when pressing enter in the navbar"
                right={<Toggle value={autoSearch} onChange={setAutoSearch} />}
              />
            </Section>
          </div>

          <div>
            <Section title="Resources">
              <Row
                icon={Code2}
                iconBg="linear-gradient(135deg,#3b82f6,#7c3aed)"
                label="API docs"
                sub="GitHub REST and GraphQL documentation"
                onClick={() =>
                  window.open("https://docs.github.com/en/rest", "_blank")
                }
              />
            </Section>

            <Section title="Danger zone">
              <Row
                icon={Trash2}
                label="Clear cached profile"
                sub="Remove the saved user from local storage"
                danger
                onClick={() => {
                  // Clear profile cache AND path memory cache together
                  localStorage.removeItem("gf-user");
                  localStorage.removeItem("gf-last-path");

                  // Force routing straight to the landing screen dashboard home
                  window.location.href = "/";
                }}
              />
            </Section>
          </div>
        </div>

        <div className="settings-save-row">
          <button
            onClick={handleSave}
            className={`settings-save-btn ${saved ? "saved" : "idle"}`}
          >
            {saved ? (
              <>
                <Check size={16} /> Saved
              </>
            ) : (
              "Save preferences"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;