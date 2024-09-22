import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-jogos',
  templateUrl: './cadastro-jogos.component.html',
  styleUrls: ['./cadastro-jogos.component.scss']
})
export class CadastroJogosComponent implements OnInit {
  categories: any[] = [];
  gameName = '';
  gameCategory = '';
  gameUrl = '';
  gameVideoUrl = '';
  gameImageUrl = '';
  gameDescription = '';
  modalMessage = '';
  modalOpen = false;
  isLoaderOpen = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.consultCategories();
  }

  cleanGame() {
    this.gameName = '';
    this.gameCategory = '';
    this.gameUrl = '';
    this.gameVideoUrl = '';
    this.gameImageUrl = '';
    this.gameDescription = '';
  }

  closeModal() {
    this.modalOpen = false;
    this.modalMessage = '';
  }

  openModal() {
    this.modalOpen = true;
  }

  consultCategories() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/categories/consult' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/categories/consult';

    this.http.get<string[]>(fetchURL).subscribe({
      next: (data) => {
        if (data.length >= 1) {
          this.categories = data;
        } else {
          this.openErrorModal('Erro inesperado, por favor recarregue a página!');
        }
        this.isLoaderOpen = false;
      },
      error: () => {
        this.openErrorModal('Erro inesperado, por favor recarregue a página!');
      }
    });
  }

  openErrorModal(message: string) {
    this.isLoaderOpen = false;
    this.modalMessage = message;
    this.openModal();
  }

  validateInputs() {
    if (this.gameName && this.gameCategory && this.gameUrl && this.gameImageUrl && this.gameDescription) {
      this.consultGame();
      this.isLoaderOpen = true;
    } else {
      this.openErrorModal('Preencha todos os campos obrigatórios!');
    }
  }

  consultGame() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/game/consult' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/game/consult';

    this.http.post(fetchURL, { game_name: this.gameName }).subscribe({
      next: (data: any) => {
        if (data.length === 0) {
          this.registerGame();
        } else {
          this.openErrorModal(`Jogo "${data[0].game_name}" já cadastrado! Você pode atualizar ou excluir esse jogo.`);
          this.cleanGame();
        }
      },
      error: () => {
        this.openErrorModal('Erro inesperado, tente novamente!');
      }
    });
  }

  registerGame() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/game/register' : 'http://stars-games-back-env.sa-east-1.elasticbeanstalk.com/game/register';

    const body = {
      game_name: this.gameName,
      game_category: this.gameCategory,
      game_url: this.gameUrl,
      game_video_url: this.gameVideoUrl,
      game_image_url: this.gameImageUrl,
      game_description: this.gameDescription,
    };

    this.http.post(fetchURL, body).subscribe({
      next: (data: any) => {
        if (data.acknowledged) {
          this.openModal();
          this.modalMessage = 'Jogo cadastrado com sucesso!';
          this.cleanGame();
        } else {
          this.openErrorModal('Erro inesperado, tente novamente!');
        }
        this.isLoaderOpen = false;
      },
      error: () => {
        this.openErrorModal('Erro inesperado, tente novamente!');
      }
    });
  }
}
