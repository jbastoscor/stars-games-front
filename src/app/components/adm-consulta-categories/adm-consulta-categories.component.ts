import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adm-consulta-categories',
  templateUrl: './adm-consulta-categories.component.html',
  styleUrls: ['./adm-consulta-categories.component.scss']
})
export class AdmConsultaCategoriesComponent {
  category_name_legacy = '';
  category_name = '';
  category_logo = '';
  category_image = '';
  modal_message = '';
  is_modal_message_open = false;
  is_loader_open = false;
  is_update_category_open = false;

  constructor(private http: HttpClient) { }

  closeModalMessage() {
    this.is_modal_message_open = false;
    this.modal_message = '';
  }

  openMessageModal() {
    this.is_modal_message_open = true;
  }

  cleanCategory() {
    this.category_name_legacy = '';
    this.category_name = '';
    this.category_logo = '';
    this.category_image = '';
    this.is_update_category_open = false;
  }

  consultCategory() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/category/consult' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/consult';

    this.http.post(fetchURL, { category_name: this.category_name }).subscribe((response: any) => {
      if (response.length === 1) {
        this.is_loader_open = false;
        this.category_name_legacy = this.category_name;
        this.category_logo = response[0].category_logo;
        this.category_image = response[0].category_image;
        this.is_update_category_open = true;
      } else {
        this.is_loader_open = false;
        this.modal_message = `A categoria "${this.category_name}" não existe! Se quiser você pode cadastrar essa categoria.`;
        this.openMessageModal();
        this.cleanCategory();
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.openMessageModal();
    });
  }

  validateInputs() {
    if (this.category_name) {
      this.is_loader_open = true;
      this.consultCategory();
    } else {
      this.modal_message = 'Digite o nome da categoria que deseja consultar!';
      this.openMessageModal();
    }
  }

  updateCategory() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? 'http://localhost:8080/category/update' : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/update';

    this.http.post(fetchURL, {
      category_query: { category_name: this.category_name_legacy },
      category_newValues: {
        category_name: this.category_name,
        category_logo: this.category_logo,
        category_image: this.category_image
      }
    }).subscribe((response: any) => {
      if (response.acknowledged) {
        this.is_loader_open = false;
        this.modal_message = 'Categoria alterada com sucesso!';
        this.openMessageModal();
        this.cleanCategory();
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.openMessageModal();
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.openMessageModal();
    });
  }

  validateUpdateInputs() {
    if (this.category_name && this.category_logo && this.category_image) {
      this.updateCategory();
    } else {
      this.modal_message = 'Complete todos os campos para finalizar essa alteração!';
      this.openMessageModal();
    }
  }
}