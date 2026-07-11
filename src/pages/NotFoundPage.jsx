import { useNavigate } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="nf-wrapper">
      <div className="nf-orb nf-orb-1" />
      <div className="nf-orb nf-orb-2" />
      <div className="nf-orb nf-orb-3" />
      {[...Array(10)].map((_, i) => (
        <div key={i} className="nf-particle" style={{
          top: `${10 + ((i * 37) % 80)}%`, left: `${8 + ((i * 53) % 84)}%`,
          animationDelay: `${i * 0.4}s`, animationDuration: `${5 + (i % 4)}s`,
        }} />
      ))}
      <div className="nf-content">
        <div className="nf-icon-wrap">
          <div className="nf-icon-ring" />
          <div className="nf-icon-ring nf-icon-ring-2" />
          <div className="nf-icon"><SearchX size={44} color="#fff" /></div>
        </div>
        <div className="nf-code">
          <span className="nf-digit">4</span>
          <span className="nf-digit nf-digit-mid">0</span>
          <span className="nf-digit">4</span>
        </div>
        <div className="nf-divider" />
        <h2 className="nf-title">Oops! Page not found</h2>
        <p className="nf-desc">The page you're looking for doesn't exist, was removed, or the URL might be wrong.</p>
        <div className="nf-actions">
          <button className="nf-btn-primary" onClick={() => navigate("/")}>
            <Home size={18} /> Back to home
          </button>
          <button className="nf-btn-secondary" onClick={() => navigate(-1)}>Go back</button>
        </div>
        <p className="nf-hint">💡 Use the sidebar to navigate between pages</p>
      </div>
    </div>
  );
};

export default NotFoundPage;