import { Star, GitFork, ExternalLink, Trophy } from "lucide-react";

const TopRepositories = ({ repos = [], userData }) => (
  <section className="toprepo-card">
    <div className="card-particle card-p1"></div>
    <div className="card-particle card-p2"></div>
    <div className="card-particle card-p3"></div>

    <div className="sec-header">
      <div className="sec-header-left">
        <div className="sec-icon"><Trophy size={18} /></div>
        <div>
          <h2 className="sec-title">Top repositories</h2>
          <p className="sec-sub">Most popular projects</p>
        </div>
      </div>
      {userData && (
        <button className="sec-action"
          onClick={() => window.open(`${userData.html_url}?tab=repositories`, "_blank")}>
          View all
        </button>
      )}
    </div>

    {repos.length === 0 ? (
      <div className="empty-state">
        <Trophy size={32} className="empty-icon" />
        <p>Search a GitHub user to see top repositories.</p>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {repos.map((repo, index) => (
          <div key={repo.id} className="toprepo-item"
            onClick={() => window.open(repo.html_url, "_blank")}>
            <div className="toprepo-rank">#{index + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <span className="toprepo-name">{repo.name}</span>
                <ExternalLink size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="toprepo-stat-pill"><Star size={12} /> {repo.stargazers_count}</span>
                <span className="toprepo-stat-pill"><GitFork size={12} /> {repo.forks_count}</span>
                {repo.language && <span className="repo-lang">{repo.language}</span>}
              </div>
              <div className="toprepo-bar">
                <div className="toprepo-bar-fill" style={{ width: `${Math.max(15, 100 - index * 14)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default TopRepositories;