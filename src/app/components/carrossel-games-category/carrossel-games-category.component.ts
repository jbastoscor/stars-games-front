import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrossel-games-category',
  templateUrl: './carrossel-games-category.component.html',
  styleUrls: ['./carrossel-games-category.component.scss']
})
export class CarrosselGamesCategoryComponent implements OnInit {
  @Input() gamesCategory!: string;
  games: any[] = [];
  loaderOpen: boolean = false;

  settings = {
    arrows: true,
    dots: true,
    infinite: true,
    mobileFirst: false,
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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.consultGamesByCategory();
  }

  navigationToGame(game: any): void {
    this.router.navigate(['/game'], { queryParams: { id: game._id } });
  }

  consultGamesByCategory(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/games/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/games/consult';

    this.http.post(fetchURL, { game_category: this.gamesCategory }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).subscribe((response: any) => {
      if (response.length >= 1) {
        this.loaderOpen = false;
        this.games = response;
      } else {
        this.loaderOpen = false;
      }
    }, () => {
      this.loaderOpen = false;
    });
  }
}