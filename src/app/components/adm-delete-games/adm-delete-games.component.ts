import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adm-delete-games',
  templateUrl: './adm-delete-games.component.html',
  styleUrls: ['./adm-delete-games.component.scss']
})
export class AdmDeleteGamesComponent implements OnInit {
  game_name = '';
  game_category = '';
  game_url = '';
  game_video_url = '';
  game_image_url = '';
  game_description = '';
  game_delete_modal = false;
  message_modal_open = false;
  modal_message = '';
  loader_open = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  validateInput() {
    if (this.game_name) {
      this.loader_open = true;
      this.consultGame();
    } else {
      this.modal_message = 'Digite o nome do jogo que deseja excluir!';
      this.openMessageModal();
    }
  }

  closeMessageModal() {
    this.message_modal_open = false;
    this.modal_message = '';
  }

  openMessageModal() {
    this.message_modal_open = true;
  }

  consultGame() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/game/consult' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult';

    this.http.post(fetchURL, { game_name: this.game_name }).subscribe((response: any) => {
      if (response.length === 1) {
        this.loader_open = false;
        this.game_name = response[0].game_name;
        this.game_category = response[0].game_category;
        this.game_url = response[0].game_url;
        this.game_video_url = response[0].game_video_url;
        this.game_image_url = response[0].game_image_url;
        this.game_description = response[0].game_description;
        this.game_delete_modal = true;
      } else if (response.length === 0) {
        this.loader_open = false;
        this.modal_message = `Jogo "${this.game_name}" não existe!`;
        this.openMessageModal();
        this.cleanGame();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.openMessageModal();
    });
  }

  cleanGame() {
    this.game_name = '';
  }

  closeDeleteModal() {
    this.game_name = '';
    this.game_category = '';
    this.game_url = '';
    this.game_video_url = '';
    this.game_image_url = '';
    this.game_description = '';
    this.game_delete_modal = false;
  }

  deleteGame() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/game/delete' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/delete';

    this.loader_open = true;

    this.http.post(fetchURL, { game_name: this.game_name }).subscribe((response: any) => {
      if (response.deletedCount === 1) {
        const deletedGame = this.game_name;
        this.loader_open = false;
        this.closeDeleteModal();
        this.modal_message = `Jogo "${deletedGame}" excluído com sucesso!`;
        this.openMessageModal();
      } else {
        this.loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.openMessageModal();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.openMessageModal();
    });
  }
}