import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private apiUrl = 'http://localhost:5000/api/repos/';

  constructor(private http: HttpClient) {}

  getRepos(): Observable<any> {
    return this.http.get<RepoData[]>(this.apiUrl);
  }

  // Method to get repo details by name
  getRepoDetails(repoName: string): Observable<RepoData> {
    return this.http.get<RepoData>(`${this.apiUrl}${repoName}`);
  }
}
