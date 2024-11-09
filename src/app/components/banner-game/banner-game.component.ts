import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banner-game',
  templateUrl: './banner-game.component.html',
  styleUrls: ['./banner-game.component.scss']
})
export class BannerGameComponent implements OnInit {
  @Input() valueGameRating!: number;
  game_name = '';
  game_category = '';
  game_url = '';
  game_video_url = '';
  game_image_url = '';
  game_description = '';
  modal_message = '';
  is_message_modal_open = false;
  is_loader_open = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultGame();
  }

  closeMessageModal(): void {
    this.modal_message = '';
    this.is_message_modal_open = false;
  }

  playGame(): void {
    window.open(this.game_url, '_blank')?.focus();
  }

  consultGame(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/game/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult';

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const game_id = urlParams.get('id');

    this.http.post(fetchURL, { _id: game_id }).subscribe((response: any) => {
      if (response.length === 1) {
        this.is_loader_open = false;
        const game = response[0];
        this.game_name = game.game_name;
        this.game_category = game.game_category;
        this.game_url = game.game_url;
        this.game_video_url = game.game_video_url;
        this.game_image_url = game.game_image_url;
        this.game_description = game.game_description;
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, favor recarregar a página.';
        this.is_message_modal_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, favor recarregar a página.';
      this.is_message_modal_open = true;
    });
  }
}