# GitScope

**GitScope** is a fast, premium dashboard to explore any GitHub profile — view repositories, contribution activity, top projects, and compare developers side by side.

🔗 **Live Demo:** [gitscope-one.vercel.app](https://gitscope-one.vercel.app/)

---

## ✨ Features

- 🔍 Search any GitHub username to instantly view their profile
- 👤 Profile overview — avatar, bio, location, join date, repos, followers, following, gists
- 📌 Pinned/featured repositories section
- 🕒 Recent activity feed (latest commits and GitHub actions)
- 📦 Dedicated Repositories page
- ⚖️ Compare Users — view two GitHub profiles side by side
- ⚡ Quick actions panel
- ⚙️ Settings page:
  - 🎨 Theme switcher (Dark / Light / System)
  - 🌈 Custom accent colour picker
  - 📐 Compact view toggle
  - ⌨️ Auto-search on Enter toggle
  - 📚 API docs shortcut (GitHub REST & GraphQL)
  - 🗑️ Clear cached profile (danger zone)
- ⌨️ Keyboard shortcut (⌘K) to jump to search
- 🎨 Clean, responsive, premium dark-themed UI

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **API:** GitHub REST API
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/gitscope.git

# Navigate to project directory
cd gitscope

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run locally at `http://localhost:5173` (or `3000`, depending on your setup).

---

## 🔑 Environment Variables

If your app uses a GitHub API token to avoid rate limits, create a `.env` file:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

---

## 📁 Project Structure

```
gitscope/
├── src/
│   ├── components/
│   ├── routing/
│   ├── constants/
│   ├── services/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## 📸 Screenshots

### Home
![Home](./screenshots/Home.png)

### Repositories
![Repositories](./screenshots/Repos.png)

### Compare
![Compare](./screenshots/Compare.png)

### Quick Actions
![Quick Actions](./screenshots/Quick.png)

### Settings
![Settings](./screenshots/Settings.png)

---

## 🧑‍💻 Author

**Aashish Kumar Yadav**
2nd Year CS Student, LNCT&S Bhopal

- GitHub: https://github.com/aashuky
- LinkedIn: https://www.linkedin.com/in/aashish-kumar-yadav-363700372/

## 🙏 Acknowledgements

- [GitHub REST API](https://docs.github.com/en/rest)
- Icons from [Lucide](https://lucide.dev/)
