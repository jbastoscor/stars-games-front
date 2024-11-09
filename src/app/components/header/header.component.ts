import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  window_width: number = 0;
  user_username: string = "";
  user_name: string = "";
  game_name: string = "";
  found_games: any[] | undefined;
  is_logged: boolean = false;
  is_modal_search_open: boolean = false;
  is_modal_profile_open: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.handleLogin();
    this.resetSearchInput();
    this.updateWindowDimensions();
    window.addEventListener('click', this.resetSearchInput.bind(this));
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.resetSearchInput.bind(this));
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.window_width = window.innerWidth;
  }

  handleLogin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.is_logged = true;
      this.user_username = user.username;
      this.user_name = user.full_name.split(" ")[0];
    }
  }

  resetSearchInput(event?: any) {
    if (this.game_name && event?.target.value !== this.game_name) {
      this.is_modal_search_open = false;
    } else {
      this.is_modal_search_open = true;
    }
  }

  navigationToGame(game: any) {
    this.router.navigate(['/game'], { queryParams: { id: game._id } });
  }

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  searchGame(event: any) {
    this.game_name = event.target.value;

    if (event.target.value.length >= 1) {
      this.consultGame(this.capitalize(event.target.value));
    } else {
      this.found_games = undefined;
      this.is_modal_search_open = false;
    }
  }

  capitalize(word: string) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  consultGame(formattedGameName: string) {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost' ? "http://localhost:8080/game/search" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/search";

    this.http.post(fetchURL, { game_name: formattedGameName }).subscribe((data: any) => {
      if (data.length >= 1 && this.game_name) {
        this.found_games = data;
        this.is_modal_search_open = true;
      } else if (data.length === 0) {
        this.found_games = undefined;
        this.is_modal_search_open = false;
      }
    });
  }

  handleProfile() {
    this.is_modal_profile_open = !this.is_modal_profile_open;
  }

  handleLogoff() {
    localStorage.removeItem('user');
    this.is_logged = false;
    this.router.navigate(['/']);
  }
}