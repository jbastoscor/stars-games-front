

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-atualiza-jogos',
  templateUrl: './consulta-atualiza-jogos.component.html',
  styleUrls: ['./consulta-atualiza-jogos.component.scss']
})
export class ConsultaAtualizaJogosComponent implements OnInit {
  categories: string[] | undefined;
  gameName: string = '';
  gameNameLegacy: string = '';
  gameCategory: string = '';
  gameUrl: string = '';
  gameVideoUrl: string = '';
  gameImageUrl: string = '';
  gameDescription: string = '';
  gameUpdate: boolean = false;
  modalOpen: boolean = false;
  loaderOpen: boolean = false;
  modalMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultCategories();
  }

  closeModal(): void {
    this.modalOpen = false;
    this.modalMessage = '';
  }

  openModal(message: string): void {
    this.modalMessage = message;
    this.modalOpen = true;
  }

  consultCategories(): void {
    const fetchURL = this.isLocalhost() ? 'http://localhost:8080/categories/consult' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/categories/consult';

    this.loaderOpen = true;
    this.http.get<any[]>(fetchURL).subscribe(
      data => {
        this.loaderOpen = false;
        if (data.length >= 1) {
          this.categories = data.map(category => category.category_name);
        } else {
          this.openModal('Erro inesperado, por favor recarregue a página!');
        }
      },
      error => {
        this.loaderOpen = false;
        this.openModal('Erro inesperado, por favor recarregue a página!');
      }
    );
  }

  validateInputsUpdate(): void {
    if (this.gameName && this.gameCategory && this.gameUrl && this.gameImageUrl && this.gameDescription) {
      this.loaderOpen = true;
      this.updateGame();
    } else {
      this.openModal('Preencha todos os campos obrigatórios!');
    }
  }

  validateInputConsult(): void {
    if (this.gameName) {
      this.loaderOpen = true;
      this.consultGame();
    } else {
      this.openModal('Digite o nome do jogo que deseja consultar!');
    }
  }

  consultGame(): void {
    const fetchURL = this.isLocalhost() ? 'http://localhost:8080/game/consult' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/game/consult';

    this.http.post<any[]>(fetchURL, { game_name: this.gameName }).subscribe(
      data => {
        this.loaderOpen = false;
        if (data.length === 1) {
          const game = data[0];
          this.gameName = game.game_name;
          this.gameNameLegacy = game.game_name;
          this.gameCategory = game.game_category;
          this.gameUrl = game.game_url;
          this.gameVideoUrl = game.game_video_url;
          this.gameImageUrl = game.game_image_url;
          this.gameDescription = game.game_description;
          this.gameUpdate = true;
        } else {
          this.openModal(`Jogo "${this.gameName}" não existe! Mas você pode cadastra-lo.`);
          this.cleanGame();
        }
      },
      error => {
        this.loaderOpen = false;
        this.openModal('Erro inesperado, tente novamente!');
      }
    );
  }

  cleanGame(): void {
    this.gameName = '';
    this.gameNameLegacy = '';
    this.gameCategory = '';
    this.gameUrl = '';
    this.gameVideoUrl = '';
    this.gameImageUrl = '';
    this.gameDescription = '';
    this.gameUpdate = false;
  }

  updateGame(): void {
    const fetchURL = this.isLocalhost() ? 'http://localhost:8080/game/update' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/game/update';

    this.http.post<any>(fetchURL, {
      game_query: { game_name: this.gameNameLegacy },
      game_newValues: {
        game_name: this.gameName,
        game_category: this.gameCategory,
        game_url: this.gameUrl,
        game_video_url: this.gameVideoUrl,
        game_image_url: this.gameImageUrl,
        game_description: this.gameDescription,
      }
    }).subscribe(
      response => {
        this.loaderOpen = false;
        if (response.acknowledged) {
          this.openModal('Jogo alterado com sucesso!');
          this.cleanGame();
        } else {
          this.openModal('Erro inesperado, tente novamente!');
        }
      },
      error => {
        this.loaderOpen = false;
        this.openModal('Erro inesperado, tente novamente!');
      }
    );
  }

  isLocalhost(): boolean {
    return window.location.hostname === 'localhost';
  }
}

