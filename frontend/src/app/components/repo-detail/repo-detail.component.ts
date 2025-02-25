import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    forks: number;
    issues: number;
    last_commit: string;
    stars: number;
  };
}

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss'],
  standalone: false
})
export class RepoDetailComponent implements OnInit {
  repoDetail?: RepoData;

  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService
  ) {}

  ngOnInit(): void {
    // Get the repo_name from the URL
    const repoName = this.route.snapshot.paramMap.get('repo_name')!;
    this.repoService.getRepoDetails(repoName).subscribe((data) => {
      this.repoDetail = data;
    });
  }
}
