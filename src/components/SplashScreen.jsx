import { FaGithub } from "react-icons/fa";

const SplashScreen = ({ leaving }) => {
  return (
    <div className={`splash${leaving ? " splash-out" : ""}`}>
      <div className="nf-orb nf-orb-1" />
      <div className="nf-orb nf-orb-2" />
      <div className="nf-orb nf-orb-3" />

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="nf-particle"
          style={{
            top: `${10 + ((i * 37) % 80)}%`,
            left: `${8 + ((i * 53) % 84)}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="nf-content" style={{ perspective: "1000px" }}>
        <div className="nf-icon-wrap" style={{ width: 116, height: 116, marginBottom: 30, transformStyle: "preserve-3d", animation: "logo3D 4s ease-in-out infinite alternate" }}>
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
        @keyframes logo3D {
          0% { transform: rotateY(-15deg) rotateX(5deg); }
          100% { transform: rotateY(15deg) rotateX(-5deg); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;