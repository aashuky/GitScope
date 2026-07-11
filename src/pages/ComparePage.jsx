import { useState } from "react";
import {
  Users,
  ArrowRightLeft,
  GitCompare,
  Search,
  UserPlus,
  Trophy,
  FolderGit2,
  BookMarked,
  Calendar,
  MapPin,
  Building2,
  Link2,
  Mail,
  AtSign,
  Hash,
  Star,
} from "lucide-react";

const ComparePage = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compareUsers = async () => {
    if (!username1.trim() || !username2.trim())
      return setError("Enter both usernames.");
    try {
      setLoading(true);
      setError("");
      const [res1, res2] = await Promise.all([
        fetch(`https://api.github.com/users/${username1.trim()}`),
        fetch(`https://api.github.com/users/${username2.trim()}`),
      ]);
      if (!res1.ok || !res2.ok)
        throw new Error("One or both users were not found.");
      setUser1(await res1.json());
      setUser2(await res2.json());
    } catch (err) {
      setError(err.message);
      setUser1(null);
      setUser2(null);
    } finally {
      setLoading(false);
    }
  };

  const score = (u) => u.followers + u.following + u.public_repos;

  const statDefs = (u) => [
    {
      icon: UserPlus,
      label: "Followers",
      value: u.followers,
      raw: u.followers,
    },
    { icon: Users, label: "Following", value: u.following, raw: u.following },
    {
      icon: FolderGit2,
      label: "Public repos",
      value: u.public_repos,
      raw: u.public_repos,
    },
    {
      icon: BookMarked,
      label: "Public gists",
      value: u.public_gists,
      raw: u.public_gists,
    },
    {
      icon: Calendar,
      label: "Joined",
      value: new Date(u.created_at).getFullYear(),
      raw: -new Date(u.created_at).getTime(),
    },
    { icon: MapPin, label: "Location", value: u.location || "—", raw: null },
    { icon: Building2, label: "Company", value: u.company || "—", raw: null },
    { icon: Link2, label: "Blog", value: u.blog ? "Yes" : "—", raw: null },
    {
      icon: Mail,
      label: "Public email",
      value: u.email ? "Yes" : "—",
      raw: null,
    },
    {
      icon: AtSign,
      label: "Twitter",
      value: u.twitter_username || "—",
      raw: null,
    },
    {
      icon: Hash,
      label: "Bio length",
      value: (u.bio || "").length,
      raw: (u.bio || "").length,
    },
    {
      icon: Star,
      label: "Followers/Following",
      value: u.following ? (u.followers / u.following).toFixed(2) : "∞",
      raw: u.following ? u.followers / u.following : Infinity,
    },
    {
      icon: GitCompare,
      label: "Hireable",
      value: u.hireable ? "Yes" : "—",
      raw: null,
    },
    { icon: Users, label: "Type", value: u.type || "—", raw: null },
    { icon: FolderGit2, label: "Total score", value: score(u), raw: score(u) },
  ];

  const compareRows = () => {
    if (!user1 || !user2) return [];
    const rows1 = statDefs(user1);
    const rows2 = statDefs(user2);
    return rows1.map((row, i) => ({
      label: row.label,
      icon: row.icon,
      v1: row.value,
      v2: rows2[i].value,
      raw1: row.raw,
      raw2: rows2[i].raw,
    }));
  };

  const winnerFor = (raw1, raw2) => {
    if (raw1 === null || raw2 === null) return null;
    if (raw1 === raw2) return null;
    return raw1 > raw2 ? "u1" : "u2";
  };

  const s1 = user1 ? score(user1) : 0;
  const s2 = user2 ? score(user2) : 0;

  return (
    <section className="compare-wrap">
      <div className="sec-header">
        <div className="sec-header-left">
          <div className="sec-icon">
            <GitCompare size={18} />
          </div>
          <div>
            <h2 className="sec-title" style={{ fontSize: "1.2rem" }}>
              Compare GitHub users
            </h2>
            <p className="sec-sub">
              Compare 15+ profile stats side by side, instantly
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 18,
        }}
      >
        <div className="compare-input-row">
          <Search
            size={18}
            style={{ color: "var(--accent-from)", flexShrink: 0 }}
          />
          <input
            className="compare-input"
            placeholder="First GitHub username"
            value={username1}
            onChange={(e) => setUsername1(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && compareUsers()}
          />
        </div>

        <div className="compare-vs">VS</div>

        <div className="compare-input-row">
          <Search size={18} style={{ color: "#06b6d4", flexShrink: 0 }} />
          <input
            className="compare-input"
            placeholder="Second GitHub username"
            value={username2}
            onChange={(e) => setUsername2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && compareUsers()}
          />
        </div>
      </div>

      <button
        className="compare-btn"
        onClick={compareUsers}
        disabled={loading}
        style={{ marginTop: 18 }}
      >
        <ArrowRightLeft size={18} />
        {loading ? "Comparing…" : "Compare profiles"}
      </button>

      {error && <p className="compare-error">{error}</p>}

      {user1 && user2 && (
        <div style={{ marginTop: 32 }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: 16,
            }}
          >
            Comparison result
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 16,
            }}
          >
            {[user1, user2].map((u, idx) => {
              const win = idx === 0 ? s1 > s2 : s2 > s1;
              return (
                <div
                  key={idx}
                  className={`compare-user-card${win ? " winner" : ""}`}
                >
                  <img
                    src={u.avatar_url}
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      margin: "0 auto 12px",
                      display: "block",
                      border: "3px solid var(--accent-from)",
                    }}
                  />
                  <h4
                    style={{
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-heading)",
                    }}
                  >
                    {u.login}
                  </h4>
                  <p
                    style={{
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                      marginBottom: 16,
                    }}
                  >
                    {u.name || "—"}
                  </p>

                  {statDefs(u).map(({ icon: Icon, label, value }, i) => {
                    const rowRaw = compareRows()[i];
                    const w = winnerFor(rowRaw.raw1, rowRaw.raw2);
                    const isWinnerHere =
                      (idx === 0 && w === "u1") || (idx === 1 && w === "u2");
                    return (
                      <div className="compare-stat-row" key={label}>
                        <span className="compare-stat-label">
                          <Icon size={14} /> {label}
                        </span>
                        <span
                          className={`compare-stat-value${isWinnerHere ? " win" : ""}`}
                        >
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="compare-winner-box">
            <Trophy
              size={34}
              color="#fde68a"
              style={{ margin: "0 auto 10px", display: "block" }}
            />
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
              Winner
            </p>
            <p
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginTop: 6,
              }}
            >
              {s1 > s2 ? user1.login : s2 > s1 ? user2.login : "It's a tie!"}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.8rem",
                marginTop: 4,
              }}
            >
              based on followers + following + public repos
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ComparePage;