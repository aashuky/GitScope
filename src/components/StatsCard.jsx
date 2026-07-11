import { FaGithub } from "react-icons/fa";

const SplashScreen = ({ leaving }) => {
  return (
    <div className={`splash${leaving ? " splash-out" : ""}`}>
      <div className="nf-orb nf-orb-1" />
      <div className="nf-orb nf-orb-2" />
      <div className="nf-orb nf-orb-3" />

      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="nf-particle"
          style={{
            top: `${10 + ((i * 37) % 80)}%`,
            left: `${8 + ((i * 53) % 84)}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}

      <div className="nf-content">
        <div className="nf-icon-wrap" style={{ width: 116, height: 116, marginBottom: 30 }}>
          <div className="nf-icon-ring" />
          <div className="nf-icon-ring nf-icon-ring-2" />
          <div className="nf-icon" style={{
            width: 102, height: 102, borderRadius: 28,
            boxShadow: "0 0 36px rgba(168,85,247,0.55), 0 0 70px rgba(79,70,229,0.22)",
          }}>
            <FaGithub size={48} color="#fff" />
          </div>
        </div>

        <div className="nf-code" style={{ letterSpacing: "-2px", marginBottom: 6 }}>
          {"GitHub".split("").map((ch, i) => (
            <span key={i} className="nf-digit"
              style={{ fontSize: "3.4rem", letterSpacing: "-1px", animationDelay: `${0.05 * i}s` }}>
              {ch}
            </span>
          ))}
        </div>

        {/* Updated secondary text element block from "Finder" to "Scope" */}
        <div className="nf-code" style={{ letterSpacing: "-1px", marginBottom: 24 }}>
          {"Scope".split("").map((ch, i) => (
            <span key={i} className="nf-digit nf-digit-mid"
              style={{ fontSize: "2.5rem", letterSpacing: "-0.5px", animationDelay: `${0.05 * i + 0.3}s` }}>
              {ch}
            </span>
          ))}
        </div>

        <div className="nf-divider" style={{ animationDelay: "0.6s" }} />
        <p className="nf-desc" style={{ marginBottom: 30, animationDelay: "0.75s" }}>
          Explore, analyze and compare GitHub profiles
        </p>

        <div style={{
          width: 220, height: 3, borderRadius: 999,
          background: "rgba(255,255,255,0.07)", overflow: "hidden",
          animation: "nfUp 0.55s ease 0.9s both",
        }}>
          <div style={{
            height: "100%", borderRadius: 999,
            background: "linear-gradient(90deg,#9333ea,#6366f1,#06b6d4)",
            backgroundSize: "200% 100%",
            animation: "splashBar 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes splashBar {
          0%   { width: 0%;   background-position: 0% 50%; }
          50%  { width: 78%;  background-position: 100% 50%; }
          100% { width: 100%; background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;import {
  BookOpen,
  Users,
  Star,
  GitFork,
  FileCode,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Repositories", value: "120", icon: BookOpen },
  { label: "Followers", value: "500", icon: Users },
  { label: "Following", value: "454", icon: Users },
  { label: "Stars", value: "5.8K", icon: Star },
  { label: "Forks", value: "102K", icon: GitFork },
  { label: "Gists", value: "4", icon: FileCode },
];

const languages = [
  {
    name: "JavaScript",
    pct: 43.5,
    color: "language-yellow",
  },
  {
    name: "TypeScript",
    pct: 28,
    color: "language-blue",
  },
  {
    name: "Python",
    pct: 15,
    color: "language-green",
  },
];

const StatsCard = () => {
  return (
    <section className="stats-card h-full flex flex-col bg-slate-900 border border-slate-700 rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="stats-icon-wrapper">
          <TrendingUp size={18} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            GitHub Stats
          </h2>

          <p className="text-xs text-slate-400">
            Performance Overview
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1 content-start items-stretch">

        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="stat-item"
          >
            <Icon
              size={18}
              className="stat-item-icon"
            />

            <h3>{value}</h3>

            <p>{label}</p>
          </div>
        ))}

      </div>

      {/* Languages */}
      <div className="mt-7 flex-none">

        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          Top Languages
        </h3>

        <div className="space-y-4">

          {languages.map(
            ({ name, pct, color }) => (
              <div key={name}>

                <div className="flex justify-between mb-2 text-sm">

                  <span className="text-slate-300">
                    {name}
                  </span>

                  <span className="text-purple-400 font-medium">
                    {pct}%
                  </span>

                </div>

                <div className="language-track">

                  <div
                    className={`language-fill ${color}`}
                    style={{
                      width: `${pct}%`,
                    }}
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default StatsCard;