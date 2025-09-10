# My GitHub Statistics Dashboard

An interactive web dashboard displaying comprehensive GitHub statistics for [@o2alexanderfedin](https://github.com/o2alexanderfedin) over the last 5 years.

🌐 **Live Dashboard**: [https://o2alexanderfedin.github.io/my-stats/](https://o2alexanderfedin.github.io/my-stats/)

## 📊 Statistics Overview

### Repository Statistics
- **Total Repositories**: 232
- **Created by me**: 64
- **Forked from others**: 168
- **Forked & Modified**: 22

### Commit Statistics (Last 5 Years)
- **Total Commits**: 2,253
- **Active Days**: 542
- **Average Commits per Year**: 450.6
- **Average Commits per Active Day**: 13.13
- **Min Commits per Day**: 1
- **Max Commits per Day**: 95
- **Min Commits per Year**: 32 (2020, partial year)
- **Max Commits per Year**: 817 (2024)

### Yearly Breakdown
- **2020** (Sep-Dec): 32 commits
- **2021**: 336 commits
- **2022**: 191 commits
- **2023**: 412 commits
- **2024**: 817 commits
- **2025** (Jan-Sep): 465 commits

## 🚀 Features

### Interactive Web Dashboard
- **Overview Mode**: High-level statistics with visual charts
- **Detailed Mode**: Year-by-year breakdown
- **Filtering**: Filter by specific years
- **Sorting**: Sort by year or commit count
- **Responsive Design**: Works on desktop and mobile

### Charts & Visualizations
- **Yearly Commits Chart**: Bar chart showing commit activity by year
- **Repository Types Chart**: Doughnut chart showing repository distribution
- **Real-time Filtering**: Dynamic updates based on user selections

## 🛠️ Technical Implementation

### Data Collection
- Uses GitHub CLI (`gh`) to fetch repository and commit data
- Processes GitHub GraphQL API responses for contribution statistics
- Handles API limitations (1-year maximum date range) by querying each year separately

### Data Processing
- **Node.js Script** (`process_stats.js`): Processes raw GitHub data into structured JSON
- **Repository Analysis**: Identifies created vs forked repositories
- **Commit Analysis**: Calculates daily, yearly, and overall statistics
- **Fork Analysis**: Determines which forked repositories have been modified

### Web Interface
- **Pure HTML/CSS/JavaScript**: No build process required
- **Chart.js Integration**: Interactive charts and visualizations
- **Responsive Design**: Mobile-friendly interface
- **GitHub Pages Deployment**: Automatic hosting

## 📁 Project Structure

```
my-stats/
├── index.html              # Main dashboard interface
├── github_stats.json       # Processed statistics data
├── process_stats.js        # Data processing script
├── repo_data.json          # Raw repository data
├── commits_data.json       # Raw commit data (2020-2024)
├── commits_2025.json       # Raw commit data (2025)
└── README.md               # This file
```

## 🔧 Usage

### View the Dashboard
Simply visit: [https://o2alexanderfedin.github.io/my-stats/](https://o2alexanderfedin.github.io/my-stats/)

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/o2alexanderfedin/my-stats.git
   cd my-stats
   ```

2. Open `index.html` in a web browser

### Update Statistics
To update the statistics with fresh data:

1. Ensure GitHub CLI is installed and authenticated:
   ```bash
   gh auth status
   ```

2. Run the data collection and processing:
   ```bash
   # Collect fresh data
   gh repo list --json name,owner,createdAt,isFork,pushedAt,url --limit 1000 > repo_data.json
   
   # Process the data
   node process_stats.js
   ```

3. The dashboard will automatically load the updated `github_stats.json`

## 📈 Key Insights

- **Consistent Activity**: Active coding across all 5 years with increasing trend
- **Peak Year**: 2024 was the most productive year with 817 commits
- **Daily Productivity**: Averaging 13+ commits per active day shows focused work sessions
- **Repository Management**: 22 forked repositories have been actively modified
- **Growth Trend**: Commit activity has generally increased over time

## 🛡️ Privacy & Security

- All data is publicly available through GitHub's API
- No private repository information is collected
- Only commit counts and dates are processed, not commit content
- All data processing is done locally

## 🤖 AI-Generated

This entire project was created with assistance from Claude Code, including:
- Data collection strategy
- Statistics processing logic  
- Interactive web dashboard
- Documentation and deployment

---

*Last updated: 2025-09-09*  
*Generated with [Claude Code](https://claude.ai/code)*