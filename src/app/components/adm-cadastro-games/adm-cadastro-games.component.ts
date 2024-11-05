import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adm-cadastro-games',
  templateUrl: './adm-cadastro-games.component.html',
  styleUrls: ['./adm-cadastro-games.component.scss']
})
export class AdmCadastroGamesComponent implements OnInit {
  categories: string[] | undefined;
  game_name = '';
  game_category = '';
  game_url = '';
  game_video_url = '';
  game_image_url = '';
  game_description = '';
  modal_message = '';
  modal_open = false;
  is_loader_open = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.handleLogin();
    this.consultCategories();
  }

  handleLogin(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.consultUser(user.username);
    } else {
      window.location.href = `${window.location.origin}/login`;
    }
  }

  consultUser(username: string): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/user/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/consult";

    const body = { user_username: username };

    this.http.post(fetchURL, body).subscribe((response: any) => {
      if (response.length === 1 && !response[0].is_adm) {
        window.location.href = `${window.location.origin}/login`;
      } else {
        window.location.href = `${window.location.origin}/login`;
      }
    }, () => {
      window.location.href = `${window.location.origin}/login`;
    });
  }

  cleanGame(): void {
    this.game_name = '';
    this.game_category = '';
    this.game_url = '';
    this.game_video_url = '';
    this.game_image_url = '';
    this.game_description = '';
  }

  closeModal(): void {
    this.modal_open = false;
    this.modal_message = '';
  }

  openModal(): void {
    this.modal_open = true;
  }

  consultCategories(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/categories/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/categories/consult";

    this.http.get(fetchURL).subscribe((data: any) => {
      if (data.length >= 1) {
        this.categories = data.map((category: any) => category.category_name);
        this.is_loader_open = false;
      } else {
        this.is_loader_open = false;
        this.modal_message = "Erro inesperado, por favor recarregue a página!";
        this.openModal();
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = "Erro inesperado, por favor recarregue a página!";
      this.openModal();
    });
  }

  validateInputs(): void {
    if (this.game_name && this.game_category && this.game_url && this.game_image_url && this.game_description) {
      this.consultGame();
      this.is_loader_open = true;
    } else {
      this.modal_message = "Preencha todos os campos obrigatórios!";
      this.openModal();
    }
  }

  consultGame(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/game/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult";

    this.http.post(fetchURL, { game_name: this.game_name }).subscribe((data: any) => {
      if (data.length === 0) {
        this.registerGame();
      } else {
        this.is_loader_open = false;
        this.modal_message = `Jogo "${data[0].game_name}" já cadastrado! Você pode atualizar ou excluir esse jogo.`;
        this.openModal();
        this.cleanGame();
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openModal();
    });
  }

  registerGame(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/game/register" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/register";

    const feacthBody = {
      game_name: this.game_name,
      game_category: this.game_category,
      game_url: this.game_url,
      game_video_url: this.game_video_url,
      game_image_url: this.game_image_url,
      game_description: this.game_description,
    };

    this.http.post(fetchURL, feacthBody).subscribe((data: any) => {
      if (data.acknowledged) {
        this.is_loader_open = false;
        this.modal_message = "Jogo cadastrado com sucesso!";
        this.openModal();
        this.cleanGame();
      } else {
        this.is_loader_open = false;
        this.modal_message = "Erro inesperado, tente novamente!";
        this.openModal();
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openModal();
    });
  }
}