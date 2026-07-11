import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Code2 } from "lucide-react";

const COLORS = [
  "#facc15",
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#ef4444",
];

const LanguageChart = ({ repos }) => {
  const hasData = repos && repos.length > 0;
  const langCount = {};
  if (hasData)
    repos.forEach((r) => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
  const total = Object.values(langCount).reduce((s, v) => s + v, 0);
  const data = Object.entries(langCount)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <section className="lang-card">
      <div className="card-particle card-p1"></div>
      <div className="card-particle card-p2"></div>
      <div className="card-particle card-p3"></div>

      <div className="sec-header">
        <div className="sec-header-left">
          <div className="sec-icon">
            <Code2 size={18} />
          </div>
          <div>
            <h2 className="sec-title">Language distribution</h2>
            <p className="sec-sub">Based on repositories</p>
          </div>
        </div>
      </div>

      {!hasData || data.length === 0 ? (
        <div className="empty-state">
          <Code2 size={32} className="empty-icon" />
          <p>Search a GitHub user to see languages.</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            flex: 1,
            minHeight: 0, // 👈 add this line
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width={210} height={210}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={82}
                  paddingAngle={4}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    color: "#f1f5f9",
                  }}
                  formatter={(v) => [`${v}%`, "Usage"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                }}
              >
                {data.length}
              </span>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Languages
              </p>
            </div>
          </div>

          <div style={{ flex: 1, width: "100%", minWidth: 0 }}>
            {data.map((item, i) => (
              <div key={item.name} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      className="lang-dot"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span
                      style={{
                        color: "var(--text-body)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "var(--accent-from)",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="lang-track">
                  <div
                    className="lang-fill"
                    style={{
                      width: `${item.value}%`,
                      background: COLORS[i % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LanguageChart;
