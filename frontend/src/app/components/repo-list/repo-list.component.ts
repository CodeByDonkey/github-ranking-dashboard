import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';

interface RepoData {
  repo: {
    _id: string;
    repo_name: string;
    description: string;
    language: string;
    repo_url: string;
    username: string;
    item: string;
  };
  daily_stats: {
    _id: string;
    report_date: string;
    repo_id: string;
    forks: number;
    issues: number;
    last_commit: string;
    stars: number;
  };
}

@Component({
  selector: 'app-repo-list',
  standalone: false,
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  repos: RepoData[] = [];
  filteredRepos: RepoData[] = [];
  searchTerm: string = '';
  CACHE_KEY = 'reposData';  // Key for localStorage or sessionStorage

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    // Check if repos data is cached
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    
    if (cachedData) {
      // If cached data exists, use it
      this.repos = JSON.parse(cachedData);
      this.filteredRepos = [...this.repos];  // Initially, show all repos
    } else {
      // If no cached data, fetch from API
      this.repoService.getRepos().subscribe(data => {
        this.repos = data;
        this.filteredRepos = data;
        
        // Cache the data for next time
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
      });
    }
    this.repoService.getRepos().subscribe(data => {
      this.repos = data;
      this.filteredRepos = data;  // Initially, show all repos
    });
  }

  onSearchChange(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    // Filter the repos based on the search term (repo name or description)
    this.filteredRepos = this.repos.filter(repoData =>
      repoData.repo.repo_name.toLowerCase().includes(searchTermLower) ||
      repoData.repo.description.toLowerCase().includes(searchTermLower)
    );

    // Limit the results to 5
    this.filteredRepos = this.filteredRepos.slice(0, 5);
  }
}
