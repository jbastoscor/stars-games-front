import { Component } from '@angular/core';

@Component({
  selector: 'app-adm-cadastro-categories',
  templateUrl: './adm-cadastro-categories.component.html',
  styleUrls: ['./adm-cadastro-categories.component.scss']
})
export class AdmCadastroCategoriesComponent {
  category_name: string = '';
  category_logo: string = '';
  category_image: string = '';
  modal_message: string = '';
  modal_open: boolean = false;
  loader_open: boolean = false;

  cleanCategory() {
    this.category_name = '';
    this.category_logo = '';
    this.category_image = '';
  }

  closeModal() {
    this.modal_open = false;
    this.modal_message = '';
  }

  openModal() {
    this.modal_open = true;
  }

  validateInputs() {
    if (this.category_name && this.category_logo && this.category_image) {
      this.consultCategory();
      this.loader_open = true;
    } else {
      this.modal_message = 'Preencha todos os campos da categoria que deseja cadastrar!';
      this.openModal();
    }
  }

  consultCategory() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost' ? 'http://localhost:8080/category/consult' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/consult';

    fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category_name: this.category_name })
    }).then(response => {
      if (response.status == 200 && response.statusText === 'OK') {
        response.json().then(data => {
          if (data.length === 0) {
            this.registerCategory();
          } else {
            this.loader_open = false;
            this.modal_message = `A categoria "${data[0].category_name}" já está cadastrada! Se quiser você pode alterar ou excluir essa categoria.`;
            this.openModal();
            this.cleanCategory();
          }
        });
      } else {
        this.loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.openModal();
      }
    }).catch(error => {
      this.loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente! ';
      this.openModal();
    });
  }

  registerCategory() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost' ? 'http://localhost:8080/category/register' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/register';

    const fetchBody = {
      category_name: this.category_name,
      category_logo: this.category_logo,
      category_image: this.category_image
    };

    fetch(fetchURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }).then(response => {
      if (response.status == 200 && response.statusText === 'OK') {
        response.json().then(data => {
          if (data.acknowledged) {
            this.loader_open = false;
            this.modal_message = `Categoria "${this.category_name}" cadastrada com sucesso!`;
            this.openModal();
            this.cleanCategory();
          } else {
            this.loader_open = false;
            this.modal_message = 'Erro inesperado, tente novamente!';
            this.openModal();
          }
        });
      } else {
        this.loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.openModal();
      }
    }).catch(error => {
      this.loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente! ';
      this.openModal();
    });
  }
}