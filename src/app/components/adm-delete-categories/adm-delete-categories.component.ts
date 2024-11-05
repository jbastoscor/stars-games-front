import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adm-delete-categories',
  templateUrl: './adm-delete-categories.component.html',
  styleUrls: ['./adm-delete-categories.component.scss']
})
export class AdmDeleteCategoriesComponent {
  category_name: string = "";
  category_delete_modal: boolean = false;
  message_modal_open: boolean = false;
  modal_message: string = "";
  loader_open: boolean = false;

  constructor(private http: HttpClient) { }

  validateInput() {
    if (this.category_name) {
      this.loader_open = true;
      this.consultCategory();
    } else {
      this.modal_message = "Digite o nome da categoria que deseja excluir!";
      this.openMessageModal();
    }
  }

  closeMessageModal() {
    this.message_modal_open = false;
    this.modal_message = "";
  }

  openMessageModal() {
    this.message_modal_open = true;
  }

  consultCategory() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/category/consult" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/consult";

    this.http.post(fetchURL, { category_name: this.category_name }).subscribe((response: any) => {
      if (response.length === 1) {
        this.loader_open = false;
        this.category_delete_modal = true;
      } else if (response.length === 0) {
        this.loader_open = false;
        this.modal_message = `A categoria "${this.category_name}" não existe!`;
        this.openMessageModal();
        this.cleanCategory();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openMessageModal();
    });
  }

  cleanCategory() {
    this.category_name = "";
  }

  closeDeleteModal() {
    this.category_name = "";
    this.category_delete_modal = false;
  }

  deleteCategory() {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/category/delete" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/category/delete";

    this.loader_open = true;

    this.http.post(fetchURL, { category_name: this.category_name }).subscribe((response: any) => {
      if (response.deletedCount === 1) {
        const deletedCategory = this.category_name;
        this.loader_open = false;
        this.closeDeleteModal();
        this.modal_message = `Categoria "${deletedCategory}" excluída com sucesso!`;
        this.openMessageModal();
      } else {
        this.loader_open = false;
        this.modal_message = "Erro inesperado, tente novamente!";
        this.openMessageModal();
      }
    }, () => {
      this.loader_open = false;
      this.modal_message = "Erro inesperado, tente novamente!";
      this.openMessageModal();
    });
  }
}