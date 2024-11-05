import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adm-consulta-update-games',
  templateUrl: './adm-consulta-update-games.component.html',
  styleUrls: ['./adm-consulta-update-games.component.scss']
})
export class AdmConsultaUpdateGamesComponent implements OnInit {
  categories: string[] | undefined;
  game_name: string = "";
  game_name_lagacy: string = "";
  game_category: string = "";
  game_url: string = "";
  game_video_url: string = "";
  game_image_url: string = "";
  game_description: string = "";
  game_update: boolean = false;
  modal_open: boolean = false;
  loader_open: boolean = false;
  modal_message: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultCategories();
  }

  closeModal(): void {
    this.modal_open = false;
    this.modal_message = "";
  }

  openModal(): void {
    this.modal_open = true;
  }

  consultCategories(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/categories/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/categories/consult";

    this.http.get<any[]>(fetchURL).subscribe(data => {
      if (data.length >= 1) {
        this.categories = data.map(category => category.category_name);
        this.loader_open = false;
      } else {
        this.loader_open = false;
        this.modal_message = "Erro inesperado, por favor recarregue a página!";
        this.openModal();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = "Erro inesperado, por favor recarregue a página!";
      this.openModal();
    });
  }

  validateInputsUpdate(): void {
    if (this.game_name && this.game_category && this.game_url && this.game_image_url && this.game_description) {
      this.loader_open = true;
      this.updateGame();
    } else {
      this.modal_message = "Preencha todos os campos obrigatórios!";
      this.openModal();
    }
  }

  validateInputConsult(): void {
    if (this.game_name) {
      this.loader_open = true;
      this.consultGame();
    } else {
      this.modal_message = "Digite o nome do jogo que deseja consultar!";
      this.openModal();
    }
  }

  consultGame(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/game/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult";

    this.http.post<any[]>(fetchURL, { game_name: this.game_name }).subscribe(data => {
      if (data.length === 1) {
        this.loader_open = false;
        const game = data[0];
        this.game_name = game.game_name;
        this.game_name_lagacy = game.game_name;
        this.game_category = game.game_category;
        this.game_url = game.game_url;
        this.game_video_url = game.game_video_url;
        this.game_image_url = game.game_image_url;
        this.game_description = game.game_description;
        this.game_update = true;
      } else if (data.length === 0) {
        this.loader_open = false;
        this.modal_message = `Jogo "${this.game_name}" não existe! Mas você pode cadastra-lo.`;
        this.openModal();
        this.cleanGame();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openModal();
    });
  }

  cleanGame(): void {
    this.game_name = "";
    this.game_name_lagacy = "";
    this.game_category = "";
    this.game_url = "";
    this.game_video_url = "";
    this.game_image_url = "";
    this.game_description = "";
    this.game_update = false;
  }

  updateGame(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/game/update" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/update";

    this.http.post<any>(fetchURL, {
      game_query: { game_name: this.game_name_lagacy },
      game_newValues: {
        game_name: this.game_name,
        game_category: this.game_category,
        game_url: this.game_url,
        game_video_url: this.game_video_url,
        game_image_url: this.game_image_url,
        game_description: this.game_description,
      }
    }).subscribe(data => {
      if (data.acknowledged) {
        this.loader_open = false;
        this.modal_message = "Jogo alterado com sucesso!";
        this.openModal();
        this.cleanGame();
      } else {
        this.loader_open = false;
        this.modal_message = "Erro inesperado, tente novamente!";
        this.openModal();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openModal();
    });
  }
}