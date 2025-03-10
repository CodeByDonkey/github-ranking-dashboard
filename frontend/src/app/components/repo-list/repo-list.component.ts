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

    // Pagination properties
    currentPage: number = 1;
    itemsPerPage: number = 10;  // Default items per page
    totalItems: number = 0;
    totalPages: number = 0;  

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    // Check if repos data is cached
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    
    if (cachedData) {
      // If cached data exists, use it
      this.repos = JSON.parse(cachedData);
      this.filteredRepos = [...this.repos];  // Initially, show all repos
      this.totalItems = this.repos.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } else {
      // If no cached data, fetch from API
      this.repoService.getRepos().subscribe(data => {
        this.repos = data;
        this.filteredRepos = data;
        this.totalItems = this.repos.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        // Cache the data for next time
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
      });
    }
    {
    this.updatePageData();
  }
  }

  // Update filtered data based on the current page and items per page
  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredRepos = this.repos.slice(startIndex, endIndex);
  }

  // Change page
  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  // Change items per page
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  // Apply search filter and pagination together
  applyFilters(): void {
    // Apply search filter
    const searchTermLower = this.searchTerm.toLowerCase();
    const filteredBySearch = this.repos.filter(repoData =>
      repoData.repo.repo_name.toLowerCase().includes(searchTermLower) ||
      repoData.repo.description.toLowerCase().includes(searchTermLower)
    );
    
    // Update the filteredRepos array with the search results
    this.totalItems = filteredBySearch.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Apply pagination to the filtered search results
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredRepos = filteredBySearch.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
