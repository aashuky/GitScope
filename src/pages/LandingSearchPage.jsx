import { useState } from "react";
import { Search, GitBranch, Users, BarChart3 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const LandingSearchPage = ({ onSearch, loading, error }) => {
  const [value, setValue] = useState("");

  const submit = () => {
    // Rigid guard against empty values or simultaneous overlapping API requests
    if (!value.trim() || loading) return;
    onSearch(value.trim());
  };

  return (
    <div className="landing">
      <div className="landing-orb landing-orb-1" />
      <div className="landing-orb landing-orb-2" />
      <div className="landing-orb landing-orb-3" />

      <div className="landing-card">
        <div className="landing-icon-wrap">
          <div className="landing-icon-ring" />
          <div className="landing-icon-ring landing-icon-ring-2" />
          <div className="landing-icon">
            <FaGithub size={40} color="#fff" />
          </div>
        </div>

        <h1 className="landing-title">GitScope</h1>
        <p className="landing-sub">
          A high-performance React dashboard for exploring, auditing, and
          visualizing GitHub profile metrics and repository data.
        </p>

        <div className="landing-search">
          <span className="landing-search-icon">
            <Search size={20} />
          </span>
          <input
            className="landing-search-input"
            placeholder="e.g. torvalds, gaearon, sindresorhus"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // Added loading guard to the Enter key listener
            onKeyDown={(e) => e.key === "Enter" && !loading && submit()}
            autoFocus
            disabled={loading} // Optional: block input editing while API resolves
          />
          <button
            className="landing-search-btn"
            onClick={submit}
            disabled={loading || !value.trim()} // Also disable if empty string
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {error && <p className="landing-error">{error}</p>}

        <div className="landing-features">
          <span className="landing-feature">
            <span className="landing-feature-dot" />
            <GitBranch size={14} /> Repositories
          </span>
          <span className="landing-feature">
            <span className="landing-feature-dot" />
            <Users size={14} /> Followers
          </span>
          <span className="landing-feature">
            <span className="landing-feature-dot" />
            <BarChart3 size={14} /> Activity
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingSearchPage;