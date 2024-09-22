

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-excluir-jogos',
  templateUrl: './excluir-jogos.component.html',
  styleUrls: ['./excluir-jogos.component.scss']
})
export class ExcluirJogosComponent {
  game_name: string = '';
  game_name_deleted: string = '';
  game_category: string = '';
  game_url: string = '';
  game_video_url: string = '';
  game_image_url: string = '';
  game_description: string = '';
  game_delete_modal: boolean = false;
  message_modal_open: boolean = false;
  modal_message: string = '';
  loaderOpen: boolean = false;

  constructor(private http: HttpClient) { }

  validateInput() {
    if (this.game_name) {
      this.loaderOpen = true;
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
    const fetchURL = this.getFetchURL('consult');

    this.http.post(fetchURL, { game_name: this.game_name })
      .subscribe((data: any) => {
        if (data.length === 1) {
          this.loaderOpen = false;
          Object.assign(this, data[0]);
          this.game_delete_modal = true;
          this.game_name_deleted = data[0].game_name;
        } else {
          this.loaderOpen = false;
          this.modal_message = `Jogo "${this.game_name}" não existe!`;
          this.openMessageModal();
          this.cleanGame();
        }
      }, () => {
        this.loaderOpen = false;
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
    const fetchURL = this.getFetchURL('delete');
    this.loaderOpen = true;

    this.http.post(fetchURL, { game_name: this.game_name })
      .subscribe((data: any) => {
        if (data.deletedCount === 1) {
          this.loaderOpen = false;
          this.closeDeleteModal();
          this.modal_message = `Jogo "${this.game_name_deleted}" excluído com sucesso!`;
          this.openMessageModal();
        } else {
          this.loaderOpen = false;
          this.modal_message = 'Erro inesperado, tente novamente!';
          this.openMessageModal();
        }
      }, () => {
        this.loaderOpen = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.openMessageModal();
      });
  }

  private getFetchURL(action: string): string {
    const host = window.location.hostname;
    return host === 'localhost'
      ? `http://localhost:8080/game/${action}`
      : `http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/game/${action}`;
  }
}
