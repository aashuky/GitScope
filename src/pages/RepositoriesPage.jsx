import { useState } from "react";
import { Star, GitFork, Eye, Search } from "lucide-react";

const RepositoriesPage = ({ userData, repos }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("stars");

  if (!userData)
    return (
      <div className="dashboard-container">
        <div className="repos-page-wrap">
          <div className="empty-state">
            <p>Search a GitHub user to see their repositories.</p>
          </div>
        </div>
      </div>
    );

  const filtered = [...repos]
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "forks") return b.forks_count - a.forks_count;
      if (sort === "updated")
        return new Date(b.updated_at) - new Date(a.updated_at);
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="dashboard-container">
      <div className="repos-page-wrap">
        <h2 className="repos-title">
          All repositories <span className="repos-count">{repos.length}</span>
        </h2>
        <p className="repos-sub">@{userData.login}</p>

        <div className="repos-controls">
          <div className="repos-search-wrap">
            <span className="repos-search-icon">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search repositories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="repos-search"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="repos-sort"
          >
            <option value="stars">Sort: Stars</option>
            <option value="forks">Sort: Forks</option>
            <option value="updated">Sort: Recently updated</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <div className="repos-grid">
          {filtered.length === 0 ? (
            <p className="repos-empty">No repositories found.</p>
          ) : (
            filtered.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-item"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span className="repo-name">{repo.name}</span>
                  {repo.private && <span className="repo-badge">Private</span>}
                  {repo.fork && (
                    <span className="repo-badge repo-badge-fork">Fork</span>
                  )}
                </div>
                {repo.description && (
                  <p className="repo-desc">{repo.description}</p>
                )}
                <div className="repo-footer">
                  {repo.language && (
                    <span className="repo-lang">{repo.language}</span>
                  )}
                  <span className="repo-stat">
                    <Star size={13} /> {repo.stargazers_count}
                  </span>
                  <span className="repo-stat">
                    <GitFork size={13} /> {repo.forks_count}
                  </span>
                  <span className="repo-stat">
                    <Eye size={13} /> {repo.watchers_count}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
