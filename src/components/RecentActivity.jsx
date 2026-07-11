import {
  GitCommit,
  GitPullRequest,
  Star,
  FolderPlus,
  GitFork,
  Activity,
} from "lucide-react";

const iconMap = {
  PushEvent: { Icon: GitCommit, bg: "linear-gradient(135deg,#22c55e,#16a34a)" },
  PullRequestEvent: {
    Icon: GitPullRequest,
    bg: "linear-gradient(135deg,#3b82f6,#2563eb)",
  },
  WatchEvent: { Icon: Star, bg: "linear-gradient(135deg,#facc15,#eab308)" },
  CreateEvent: {
    Icon: FolderPlus,
    bg: "linear-gradient(135deg,var(--accent-from),var(--accent-to))",
  },
  ForkEvent: { Icon: GitFork, bg: "linear-gradient(135deg,#06b6d4,#0891b2)" },
};

const getActivityText = (event) => {
  switch (event.type) {
    case "PushEvent":
      return `Pushed a commit to ${event.repo?.name}`;
    case "CreateEvent":
      return `Created ${event.payload?.ref_type || "a branch"} in ${event.repo?.name}`;
    case "PullRequestEvent":
      return `Opened a pull request in ${event.repo?.name}`;
    case "WatchEvent":
      return `Starred ${event.repo?.name}`;
    case "ForkEvent":
      return `Forked ${event.repo?.name}`;
    default:
      return `${event.type?.replace("Event", "") ?? "Activity"} on ${event.repo?.name ?? ""}`;
  }
};

const RecentActivity = ({ userData, activity = [] }) => {
  const items = activity.slice(0, 5);

  return (
    <section className="activity-card">
      <div className="card-particle card-p1"></div>
      <div className="card-particle card-p2"></div>
      <div className="card-particle card-p3"></div>

      <div className="sec-header">
        <div className="sec-header-left">
          <div className="sec-icon">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="sec-title">Recent activity</h2>
            <p className="sec-sub">Latest GitHub actions</p>
          </div>
        </div>
        {userData && (
          <button
            className="sec-action"
            onClick={() => window.open(userData.html_url, "_blank")}
          >
            View all
          </button>
        )}
      </div>

      <div className="activity-timeline">
        {items.length === 0 ? (
          <div className="empty-state">
            <Activity size={32} className="empty-icon" />
            {userData ? (
              <p>No recent activity found for {userData.login}.</p>
            ) : (
              <p>Search a GitHub user to see activity.</p>
            )}
          </div>
        ) : (
          items.map((event, index) => {
            const { Icon, bg } = iconMap[event.type] ?? {
              Icon: Activity,
              bg: "linear-gradient(135deg,var(--accent-from),var(--accent-to))",
            };
            const isLast = index === items.length - 1;
            return (
              <div key={event.id || index} className="activity-item">
                {!isLast && <div className="activity-line" />}
                <div className="activity-icon" style={{ background: bg }}>
                  <Icon size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">{getActivityText(event)}</p>
                  <span className="activity-time">
                    {new Date(event.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RecentActivity;