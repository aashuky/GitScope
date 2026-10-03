import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Activity, Flame, KeyRound } from "lucide-react";

const ContributionGraph = ({ userData, hasToken }) => {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false });
  const [contributions, setContributions] = useState(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const cellRefs = useRef({});

  const TOKEN = import.meta.env.GITHUB_TOKEN;

  useEffect(() => {
    if (!hasToken || !userData?.login) {
      setContributions(null);
      return;
    }

    const controller = new AbortController();

    const fetchContributions = async () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 365);

      const query = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const res = await axios.post(
          "https://api.github.com/graphql",
          {
            query,
            variables: {
              login: userData.login,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          },
        );
        const calendar =
          res.data?.data?.user?.contributionsCollection?.contributionCalendar ??
          null;
        setContributions(calendar);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setContributions(null);
        }
      }
    };

    fetchContributions();
    return () => controller.abort();
  }, [userData?.login, hasToken, TOKEN]);

  const Empty = ({ icon, text }) => (
    <section className="cg-card">
      <div className="card-particle card-p1"></div>
      <div className="card-particle card-p2"></div>
      <div className="card-particle card-p3"></div>
      <div className="sec-header" style={{ marginBottom: 0 }}>
        <div className="sec-header-left">
          <div className="sec-icon">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="sec-title">Contribution activity</h2>
            <p className="sec-sub">Last 365 days</p>
          </div>
        </div>
      </div>
      <div className="empty-state">
        {icon}
        <p>{text}</p>
      </div>
    </section>
  );

  if (!userData)
    return (
      <Empty
        icon={<Activity size={32} className="empty-icon" />}
        text="Search a GitHub user to view contributions."
      />
    );
  if (!hasToken || !contributions)
    return (
      <Empty
        icon={<KeyRound size={32} className="empty-icon" />}
        text="Add GITHUB_TOKEN to your .env to unlock the contribution graph."
      />
    );

  const { weeks, totalContributions } = contributions;
  const graphWidth = containerRef.current?.clientWidth || 1100;

  const GAP = 3;
  const CELL = Math.max(
    10,
    Math.floor((graphWidth - GAP * (weeks.length - 1)) / weeks.length)
  );

  const STRIDE = CELL + GAP;

  const monthLabels = [];
  let lastMonthKey = "";

  weeks.forEach((week, wIdx) => {
    if (!week.contributionDays.length) return;
    const date = new Date(week.contributionDays[0].date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (monthKey !== lastMonthKey) {
      lastMonthKey = monthKey;
      monthLabels.push({
        label: date.toLocaleString("en-US", { month: "short" }),
        xOffset: wIdx * STRIDE,
      });
    }
  });

  const totalWidth = weeks.length * STRIDE - GAP;
  const legendColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  const showTooltip = (day, key) => {
    const cell = cellRefs.current[key];
    const container = containerRef.current;

    if (!cell || !container) return;

    const cellRect = cell.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let x = cellRect.left - containerRect.left + cellRect.width / 2;

    x = Math.max(90, x);
    x = Math.min(x, containerRect.width - 90);

    setHovered(day);

    setTooltip({
      x,
      y: cellRect.top - containerRect.top,
      visible: true,
    });
  };

  const hideTooltip = () => {
    setHovered(null);
    setTooltip({ x: 0, y: 0, visible: false });
  };

  return (
    <section className="cg-card" ref={containerRef}>
      <div className="card-particle card-p1"></div>
      <div className="card-particle card-p2"></div>
      <div className="card-particle card-p3"></div>

      <div className="sec-header">
        <div className="sec-header-left">
          <div className="sec-icon">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="sec-title">Contribution activity</h2>
            <p className="sec-sub">Last 365 days</p>
          </div>
        </div>
        <div className="cg-total-pill">
          <Flame size={14} className="cg-flame" />
          <span>{totalContributions.toLocaleString()} contributions</span>
        </div>
      </div>

      <div className="cg-scroll" ref={scrollRef}>
        <div
          className="cg-inner"
          style={{
            width: `${totalWidth}px`,
          }}
        >
          <div
            className="cg-months"
            style={{ position: "relative", height: 16 }}
          >
            {monthLabels.map(({ label, xOffset }, i) => (
              <span
                key={`${label}-${i}`}
                className="cg-month"
                style={{ position: "absolute", left: xOffset }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="cg-weeks">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="cg-week">
                {week.contributionDays.map((day) => {
                  const key = `${wIdx}-${day.date}`;
                  return (
                    <div
                      key={day.date}
                      ref={(el) => (cellRefs.current[key] = el)}
                      className="cg-cell"
                      style={{
                        width: CELL,
                        height: CELL,
                        backgroundColor:
                          day.contributionCount === 0 ? "#ebedf0" : day.color,
                      }}
                      onMouseEnter={() => showTooltip(day, key)}
                      onMouseLeave={hideTooltip}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cg-legend">
        <span>Less</span>
        {legendColors.map((c) => (
          <span
            key={c}
            className="cg-legend-cell"
            style={{ backgroundColor: c }}
          />
        ))}
        <span>More</span>
      </div>

      {hovered && tooltip.visible && (
        <div
          className="cg-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -120%)",
          }}
        >
          <strong>
            {hovered.contributionCount}{" "}
            {hovered.contributionCount === 1 ? "contribution" : "contributions"}
          </strong>
          <br />
          {new Date(hovered.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </section>
  );
};

export default ContributionGraph;