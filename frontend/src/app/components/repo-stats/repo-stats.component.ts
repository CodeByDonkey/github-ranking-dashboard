import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-repo-stats',
  templateUrl: './repo-stats.component.html',
  styleUrls: ['./repo-stats.component.css'],
  standalone: false
})
export class RepoStatsComponent implements OnInit {
  repoName: string = '';
  stats: any[] = [];
  chart: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.repoName = this.route.snapshot.paramMap.get('repo_name')!;
    this.fetchRepoStats();
  }

  fetchRepoStats(): void {
    this.http.get<any>(`http://localhost:5000/api/repos/${this.repoName}/stats`)
      .subscribe(response => {
        this.stats = response.daily_stats;
        this.createChart();
      });
  }

  createChart(): void {
    const labels = this.stats.map(stat => new Date(stat.report_date).toLocaleDateString());
    const starsData = this.stats.map(stat => stat.stars);
    const isDarkMode = document.body.classList.contains('dark-mode');
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart('starsChart', {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [{
          label: 'Stars Over Time',
          data: starsData.reverse(),
          borderColor: getComputedStyle(document.body).getPropertyValue('--chart-line-color'),
          backgroundColor: getComputedStyle(document.body).getPropertyValue('--chart-bg-color'),
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: getComputedStyle(document.body).getPropertyValue('--chart-line-color'),
          pointBorderColor: '#fff',
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => `Stars: ${context.raw}` } }
        },
        scales: {
          x: {
            title: { display: true, text: 'Date', font: { size: 14 } },
            grid: { display: !isDarkMode }
          },
          y: {
            title: { display: true, text: 'Stars', font: { size: 14 } },
            grid: { color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(200,200,200,0.2)' }
          }
        }
      }
    });
  }
}