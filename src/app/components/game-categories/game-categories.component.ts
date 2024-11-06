import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-categories',
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.scss']
})
export class GameCategoriesComponent implements OnInit {
  categories: any[] | undefined;
  modalMessage: string = '';
  isModalMessageOpen: boolean = false;
  isLoaderOpen: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultCategories();
  }

  sortArray(array: any[]): any[] {
    return array.sort((a, b) => {
      if (a.category_name > b.category_name) {
        return 1;
      }
      if (a.category_name < b.category_name) {
        return -1;
      }
      return 0;
    });
  }

  consultCategories(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/categories/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/categories/consult';

    this.http.get<any[]>(fetchURL).subscribe(
      data => {
        if (data.length >= 1) {
          this.categories = this.sortArray(data);
          this.isLoaderOpen = false;
        } else {
          this.isLoaderOpen = false;
          this.modalMessage = 'Erro inesperado, por favor recarregue a página!';
          this.isModalMessageOpen = true;
        }
      },
      error => {
        this.isLoaderOpen = false;
        this.modalMessage = 'Erro inesperado, por favor recarregue a página!';
        this.isModalMessageOpen = true;
      }
    );
  }

  closeModal(): void {
    this.isModalMessageOpen = false;
    this.modalMessage = '';
  }

  navigationToCategoryGames(categoryId: string): void {
    window.location.href = `${window.location.origin}/category?id=${categoryId}`;
  }
}