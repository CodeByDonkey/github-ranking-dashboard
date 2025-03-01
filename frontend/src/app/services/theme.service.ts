import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    if (this.isBrowser()) {
      const storedTheme = localStorage.getItem('darkMode');
      this.darkMode = storedTheme === 'true';
    }
    this.updateTheme();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    if (this.isBrowser()) {
      localStorage.setItem('darkMode', this.darkMode.toString());
    }

    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.isBrowser() && document) {
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
