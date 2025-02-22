import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RepoDetailComponent } from './components/repo-detail/repo-detail.component'; // Import the repo detail component
import { RepoStatsComponent } from './components/repo-stats/repo-stats.component';

const routes: Routes = [
  { path: '', component: RepoListComponent },  // Home view showing repo list
  { path: 'repo/:repo_name', component: RepoDetailComponent },  // Detail view for a repo
  { path: 'repo/:repo_name/stats', component: RepoStatsComponent } // New route for stats page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
