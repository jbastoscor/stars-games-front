import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrossel-games-recommended',
  templateUrl: './carrossel-games-recommended.component.html',
  styleUrls: ['./carrossel-games-recommended.component.scss']
})
export class CarrosselGamesRecommendedComponent implements OnInit {
  is_logged = false;
  user_username = '';
  user_all_reviews: any;
  categories: any;
  games: any;
  loader_open = false;
  settings = {
    dots: true,
    infinite: true,
    mobileFirst: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.is_logged = true;
      this.user_username = user.username;
      this.consultUserReviews(user.username);
    } else {
      this.is_logged = false;
      this.user_username = '';
    }
  }

  consultUserReviews(username: string): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/user/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/user/consult';

    this.http.post(fetchURL, { user_username: username }).subscribe((response: any) => {
      if (response.length === 1) {
        this.user_all_reviews = response[0].user_reviews;
      }
      this.consultCategories();
    }, () => {
      this.loader_open = false;
      alert('Erro inesperado, tente novamente!');
    });
  }

  consultCategories(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/categories/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/categories/consult';

    this.http.get(fetchURL).subscribe((response: any) => {
      if (response.length >= 1) {
        this.categories = response.map((category: any) => ({
          category_name: category.category_name,
          totalMentioned: 0
        }));
        this.analyzeData();
      }
    });
  }

  navigationToGame(game: any): void {
    window.location.href = `${window.location.origin}/game?id=${game._id}`;
  }

  consultGamesBycategory(category: string): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/games/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/games/consult';

    this.http.post(fetchURL, { game_category: category }).subscribe((response: any) => {
      this.loader_open = false;
      if (response.length >= 1) {
        this.games = response;
      }
    });
  }

  analyzeData(): void {
    const mentionedCategories: string[] = [];
    this.user_all_reviews.forEach((review: any) => {
      mentionedCategories.push(review.game_category);
    });

    mentionedCategories.forEach((item: string) => {
      this.categories.forEach((cat: any) => {
        if (item === cat.category_name) {
          cat.totalMentioned += 1;
        }
      });
    });

    const biggestNumberOfMentions = Math.max(...this.categories.map((item: any) => item.totalMentioned));
    const mostCategoryMentioned = this.categories.find((category: any) => category.totalMentioned === biggestNumberOfMentions);

    this.consultGamesBycategory(mostCategoryMentioned.category_name);
  }
}