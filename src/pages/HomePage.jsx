import ProfileCard from "../components/ProfileCard";
import PinnedRepositories from "../components/PinnedRepositories";
import RecentActivity from "../components/RecentActivity";
import LanguageChart from "../components/LanguageChart";
import TopRepositories from "../components/TopRepositories";
import ContributionGraph from "../components/ContributionGraph";

const HomePage = ({
  userData,
  repos,
  activity,
  contributions,
  topRepos,
  hasToken,
}) => (
  <div className="dashboard-container">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-5">
        <ProfileCard userData={userData} />
      </div>
      <div className="lg:col-span-3">
        <PinnedRepositories userData={userData} repos={repos} />
      </div>
      <div className="lg:col-span-2">
        <RecentActivity userData={userData} activity={activity} />
      </div>
      <div className="lg:col-span-3">
        <LanguageChart repos={repos} />
      </div>
      <div className="lg:col-span-2">
        <TopRepositories repos={topRepos} userData={userData} />
      </div>
      <div className="lg:col-span-5">
        <ContributionGraph
          userData={userData}
          contributions={contributions}
          hasToken={hasToken}
        />
      </div>
    </div>
  </div>
);

export default HomePage;