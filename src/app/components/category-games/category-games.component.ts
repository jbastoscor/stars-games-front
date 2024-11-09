import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-games',
  templateUrl: './category-games.component.html',
  styleUrls: ['./category-games.component.scss']
})
export class CategoryGamesComponent implements OnInit {
  category_name = '';
  category_logo = '';
  category_games: any[] | undefined;
  modal_message = '';
  is_modal_message_open = false;
  is_loader_open = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultCategory();
  }

  sortArray(array: any[]): any[] {
    return array.sort((a, b) => a.game_name.localeCompare(b.game_name));
  }

  consultCategory(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/category/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/consult';

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const category_id = urlParams.get('id');

    this.http.post(fetchURL, { _id: category_id }).subscribe((response: any) => {
      if (response.length === 1) {
        this.category_name = response[0].category_name;
        this.category_logo = response[0].category_logo;
        this.is_loader_open = false;
        this.consultGamesBycategory();
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, por favor recarregue a página!';
        this.is_modal_message_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, por favor recarregue a página!';
      this.is_modal_message_open = true;
    });
  }

  consultGamesBycategory(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/games/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/games/consult';

    this.http.post(fetchURL, { game_category: this.category_name }).subscribe((response: any) => {
      if (response.length >= 1) {
        this.category_games = this.sortArray(response);
        this.is_loader_open = false;
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, por favor recarregue a página!';
        this.is_modal_message_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, por favor recarregue a página!';
      this.is_modal_message_open = true;
    });
  }

  closeModal(): void {
    this.is_modal_message_open = false;
    this.modal_message = '';
  }

  navigationToGame(gameId: string): void {
    window.location.href = `${window.location.origin}/game?id=${gameId}`;
  }
}