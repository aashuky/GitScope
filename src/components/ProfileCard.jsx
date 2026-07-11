import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Globe,
  Calendar,
  Users,
  BookOpen,
  FileCode,
} from "lucide-react";

const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const end = Number(target) || 0;

    if (end === 0) {
      setCount(0);
      return;
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
};

const StatItem = ({ label, value, Icon, delay }) => {
  const animatedValue = useCountUp(value);

  return (
    <div className="pc-stat" style={{ animationDelay: `${delay}ms` }}>
      <div className="pc-stat-shine" />
      <Icon size={18} className="pc-stat-icon" />
      <h3 className="pc-stat-value">
        {value === undefined || value === null ? "—" : animatedValue}
      </h3>
      <p className="pc-stat-label">{label}</p>
    </div>
  );
};

const ProfileCard = ({ userData }) => {
  const stats = [
    { label: "Repositories", value: userData?.public_repos, icon: BookOpen },
    { label: "Followers", value: userData?.followers, icon: Users },
    { label: "Following", value: userData?.following, icon: Users },
    { label: "Gists", value: userData?.public_gists, icon: FileCode },
  ];

  const joinDate = userData?.created_at
    ? new Date(userData.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <section className="pc-card">
      <div className="pc-glow" />
      <span className="pc-particle pc-p1" />
      <span className="pc-particle pc-p2" />
      <span className="pc-particle pc-p3" />

      <div className="pc-top">
        <div className="pc-left">
          <div className="pc-avatar-wrap">
            <span className="pc-ring" />
            <span className="pc-ring pc-ring-2" />
            <img
              src={
                userData?.avatar_url ||
                "https://cdn-icons-png.flaticon.com/128/924/924915.png"
              }
              alt="profile"
              className="pc-avatar"
            />
          </div>

          <div className="pc-info">
            <h2 className="pc-name">{userData?.name || "No name"}</h2>
            <p className="pc-handle">@{userData?.login || "username"}</p>
            <p className="pc-bio">{userData?.bio || "No bio available"}</p>

            {userData?.blog ? (
              <a
                className="pc-company"
                href={
                  userData.blog.startsWith("http")
                    ? userData.blog
                    : `https://${userData.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {userData.blog}
              </a>
            ) : userData?.company ? (
              <span className="pc-company">{userData.company}</span>
            ) : null}

            <div className="pc-meta">
              <span className="pc-meta-item">
                <MapPin size={13} className="pc-meta-icon" />
                <span>{userData?.location || "Not specified"}</span>
              </span>
              <span className="pc-meta-item">
                <Globe size={13} className="pc-meta-icon" />
                <span>{userData?.email || "Not specified"}</span>
              </span>
              {joinDate && (
                <span className="pc-meta-item">
                  <Calendar size={13} className="pc-meta-icon" />
                  <span>{joinDate}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pc-btns">
          <button
            onClick={() =>
              userData?.html_url && window.open(userData.html_url, "_blank")
            }
            className="pc-btn-primary"
            disabled={!userData?.html_url}
          >
            Follow
          </button>
          <button
            onClick={() =>
              userData?.html_url && window.open(userData.html_url, "_blank")
            }
            className="pc-btn-ghost"
            disabled={!userData?.html_url}
          >
            View GitHub
          </button>
        </div>
      </div>

      <div className="pc-stats">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <StatItem
            key={label}
            label={label}
            value={value}
            Icon={Icon}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfileCard;
