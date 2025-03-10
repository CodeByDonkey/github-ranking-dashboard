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
  currentPage: number = 1;  // Start on the first page
  itemsPerPage: number = 5; // Number of items per page
  totalItems: number = 0;   // Total number of items (you may want to get this from your API if available)

  itemsPerPageOptions: number[] = [5, 10, 20, 50]; // Options for items per page

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRankingData();
  }

  fetchRankingData(): void {
    this.http.get<any[]>('http://localhost:5000/api/rankings/latest').subscribe(data => {
      this.rankings = data;
      this.totalItems = data.length;  // Set the total number of items for pagination
      this.paginateData();           // Call paginate to show the current page's data
    });
  }
  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.rankings = this.rankings.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }
  
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to the first page whenever the items per page changes
    this.paginateData();
  }

  // Optionally, you can calculate the total number of pages if it's not returned from the API
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}