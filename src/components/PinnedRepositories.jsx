import { BookMarked, Star, GitFork, ExternalLink } from "lucide-react";

const PinnedRepositories = ({ userData, repos = [] }) => (
  <section className="pinned-card">
    <div className="card-particle card-p1"></div>
    <div className="card-particle card-p2"></div>
    <div className="card-particle card-p3"></div>

    <div className="sec-header">
      <div className="sec-header-left">
        <div className="sec-icon"><BookMarked size={18} /></div>
        <div>
          <h2 className="sec-title">Pinned repositories</h2>
          <p className="sec-sub">Featured projects</p>
        </div>
      </div>
      {userData && (
        <button className="sec-action"
          onClick={() => window.open(`${userData.html_url}?tab=repositories`, "_blank")}>
          View all
        </button>
      )}
    </div>

    {repos.length > 0 ? (
      <div className="pinned-grid">
        {repos.slice(0, 6).map((repo) => (
          <div key={repo.id} className="repo-item"
            onClick={() => window.open(repo.html_url, "_blank")}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span className="repo-name">{repo.name}</span>
              <ExternalLink size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
            </div>
            <p className="repo-desc">{repo.description || "No description available"}</p>
            <div className="repo-footer">
              <span className="repo-stat"><Star size={12} /> {repo.stargazers_count}</span>
              <span className="repo-stat"><GitFork size={12} /> {repo.forks_count}</span>
              {repo.language && <span className="repo-lang">{repo.language}</span>}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <BookMarked size={32} className="empty-icon" />
        <p>Search a GitHub user to see repositories.</p>
      </div>
    )}
  </section>
);

export default PinnedRepositories;