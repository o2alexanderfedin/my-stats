#!/usr/bin/env node

const fs = require('fs');

// Read the repository data
const repoData = JSON.parse(fs.readFileSync('repo_data.json', 'utf8'));

// Read commits data
const commitsData = JSON.parse(fs.readFileSync('commits_data.json', 'utf8'));
const commits2025 = JSON.parse(fs.readFileSync('commits_2025.json', 'utf8'));

// Process repository statistics
const repositoryStats = {
  created: repoData.filter(repo => !repo.isFork).length,
  forked: repoData.filter(repo => repo.isFork).length,
  total: repoData.length
};

// Check which forked repos have been touched (have commits)
let touchedForkedRepos = 0;
const forkedRepos = repoData.filter(repo => repo.isFork);

// For simplicity, we'll consider a repo "touched" if pushedAt is after createdAt
forkedRepos.forEach(repo => {
  if (new Date(repo.pushedAt) > new Date(repo.createdAt)) {
    touchedForkedRepos++;
  }
});

repositoryStats.forkedAndTouched = touchedForkedRepos;

// Process commit statistics
const commitStats = {
  byYear: {},
  dailyStats: {
    daysWithCommits: 0,
    totalCommitsOnActiveDays: 0,
    minCommitsPerDay: Infinity,
    maxCommitsPerDay: 0,
    averageCommitsPerActiveDay: 0
  },
  total: {
    commits: 0,
    years: 5,
    averagePerYear: 0,
    minYear: Infinity,
    maxYear: 0
  }
};

// Combine all years data
const allYearsData = {
  y2020: commitsData.data.user.y2020,
  y2021: commitsData.data.user.y2021,
  y2022: commitsData.data.user.y2022,
  y2023: commitsData.data.user.y2023,
  y2024: commitsData.data.user.y2024,
  y2025: commits2025.data.user.y2025
};

let totalCommits = 0;
let allDaysWithCommits = [];

// Process each year
Object.entries(allYearsData).forEach(([yearKey, yearData]) => {
  const year = yearKey.replace('y', '');
  // Use totalContributions for more accurate count (includes all contributions)
  const actualCommits = yearData ? yearData.contributionCalendar.totalContributions : 0;
  
  commitStats.byYear[year] = {
    commits: actualCommits,
    totalContributions: actualCommits
  };
  
  totalCommits += actualCommits;
  
  // Track min/max per year
  if (actualCommits < commitStats.total.minYear) {
    commitStats.total.minYear = actualCommits;
  }
  if (actualCommits > commitStats.total.maxYear) {
    commitStats.total.maxYear = actualCommits;
  }
  
  // Process daily data
  yearData.contributionCalendar.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      if (day.contributionCount > 0) {
        allDaysWithCommits.push(day.contributionCount);
        
        // Update daily stats
        if (day.contributionCount < commitStats.dailyStats.minCommitsPerDay) {
          commitStats.dailyStats.minCommitsPerDay = day.contributionCount;
        }
        if (day.contributionCount > commitStats.dailyStats.maxCommitsPerDay) {
          commitStats.dailyStats.maxCommitsPerDay = day.contributionCount;
        }
      }
    });
  });
});

// Calculate final stats  
commitStats.total.commits = totalCommits;
// Calculate average per year based on actual period (2020 was partial year)
const fullYears = 4.25; // 2021-2024 + partial 2020 and 2025
commitStats.total.averagePerYear = Math.round(totalCommits / fullYears * 100) / 100;

commitStats.dailyStats.daysWithCommits = allDaysWithCommits.length;
commitStats.dailyStats.totalCommitsOnActiveDays = allDaysWithCommits.reduce((sum, count) => sum + count, 0);
commitStats.dailyStats.averageCommitsPerActiveDay = Math.round(
  commitStats.dailyStats.totalCommitsOnActiveDays / commitStats.dailyStats.daysWithCommits * 100
) / 100;

// If no commits, reset min to 0
if (commitStats.dailyStats.minCommitsPerDay === Infinity) {
  commitStats.dailyStats.minCommitsPerDay = 0;
}

// Generate comprehensive statistics object
const stats = {
  user: {
    login: "o2alexanderfedin",
    profileUrl: "https://github.com/o2alexanderfedin",
    generatedAt: new Date().toISOString()
  },
  repositories: repositoryStats,
  commits: commitStats,
  summary: {
    totalRepositories: repositoryStats.total,
    totalCommits: commitStats.total.commits,
    activeDays: commitStats.dailyStats.daysWithCommits,
    averageCommitsPerYear: commitStats.total.averagePerYear,
    averageCommitsPerActiveDay: commitStats.dailyStats.averageCommitsPerActiveDay
  }
};

// Write the processed statistics
fs.writeFileSync('github_stats.json', JSON.stringify(stats, null, 2));

console.log('GitHub statistics processed successfully!');
console.log('Summary:');
console.log(`- Total repositories: ${stats.repositories.total}`);
console.log(`- Created repositories: ${stats.repositories.created}`);
console.log(`- Forked repositories: ${stats.repositories.forked}`);
console.log(`- Forked and touched: ${stats.repositories.forkedAndTouched}`);
console.log(`- Total commits (last 5 years): ${stats.commits.total.commits}`);
console.log(`- Days with commits: ${stats.commits.dailyStats.daysWithCommits}`);
console.log(`- Average commits per year: ${stats.commits.total.averagePerYear}`);
console.log(`- Average commits per active day: ${stats.commits.dailyStats.averageCommitsPerActiveDay}`);