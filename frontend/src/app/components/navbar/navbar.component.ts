import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  repoName: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the repo_name from the current route if available
      const segments = this.router.url.split('/');
      if (segments.includes('repo') && segments.includes('stats')) {
        this.repoName = segments[2]; // Assumes URL format: /repo/:repo_name/stats
      } else {
        this.repoName = null;
      }
    });
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-mode');
  }
}
