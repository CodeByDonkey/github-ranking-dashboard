import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  standalone: false,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {
  rankings: any[] = [];
  displayedRankings: any[] = []; // Stores the paginated data
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  itemsPerPageOptions: number[] = [5, 10, 20, 50];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRankingData();
  }

  fetchRankingData(): void {
    this.http.get<any[]>('http://localhost:5000/api/rankings/latest').subscribe(data => {
      // Assign `originalRank` based on initial order
      this.rankings = data.map((repo, index) => ({
        ...repo,
        originalRank: index + 1
      }));

      this.totalItems = this.rankings.length;
      this.paginateData();
    });
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedRankings = this.rankings.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }
  
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.paginateData();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
