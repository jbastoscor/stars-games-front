import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-avaliacao-game',
  templateUrl: './avaliacao-game.component.html',
  styleUrls: ['./avaliacao-game.component.scss']
})
export class AvaliacaoGameComponent implements OnInit {
  @Output() gameRatingChange = new EventEmitter<number>();
  user_all_reviews: any;
  user_username = '';
  user_full_name = '';
  user_review: any;
  game_name = '';
  game_category = '';
  game_reviews: any;
  rating_value = 0;
  rating_quantity = 0;
  rating_label = '';
  rate_labels: { [key: number]: string } = {
    0: 'Sem avaliação',
    1: '1 / 5',
    2: '2 / 5',
    3: '3 / 5',
    4: '4 / 5',
    5: '5 / 5',
  };
  rate_value = 0;
  rate_hover = -1;
  rate_text = '';
  is_logged = false;
  is_rate_form_open = false;
  modal_message = '';
  is_message_modal_open = false;
  modal_delete_review_message = '';
  is_delete_review_modal_open = false;
  is_loader_open = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.consultGame();
    this.handleLogin();
  }

  resetStar(): void {
    this.rate_hover = this.rate_value;
  }

  emitGameRating(rating: number) {
    this.gameRatingChange.emit(rating);
  }

  handleLogin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.is_logged = true;
      this.user_username = user.username;
      this.user_full_name = user.full_name;
      return true;
    } else {
      this.is_logged = false;
      this.user_username = '';
      this.user_full_name = '';
      return false;
    }
  }

  displayGameOverall() {
    if ((this.game_reviews && this.game_reviews.length >= 1) || this.user_review) {
      let totalReviews = this.game_reviews.length;
      let totalRate = 0;

      this.game_reviews.forEach((review: any) => {
        totalRate += review.game_rating;
      });

      if (this.user_review) {
        totalRate += this.user_review.game_rating;
        totalReviews += 1;
      }

      let average = Math.round((totalRate / totalReviews + Number.EPSILON) * 100) / 100;

      // Assuming emitGameRating is a method passed as an input
      this.emitGameRating(average);
      this.rating_value = average;
      this.rating_quantity = totalReviews;
      this.rating_label = `${totalReviews} avaliações`;

      this.is_loader_open = false;
    } else {
      this.emitGameRating(0);
      this.rating_value = 0;
      this.rating_quantity = 0;
      this.rating_label = `Sem avaliações`;
      this.is_loader_open = false;
    }
  }

  consultGame() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/game/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult';

    const urlParams = new URLSearchParams(document.location.search.substring(1));
    const game_id = urlParams.get('id');

    this.http.post(fetchURL, { _id: game_id }).subscribe((response: any) => {
      if (response.length === 1) {
        this.game_name = response[0].game_name;
        this.game_category = response[0].game_category;
        this.consultGameReviews(false);
        this.consultUserReviews(false);
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, favor recarregar a página.';
        this.is_message_modal_open = true;
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  cleanRate() {
    this.is_rate_form_open = false;
    this.rate_text = '';
    this.rate_value = 0;
    this.rate_hover = -1;
  }

  validateInputsRate() {
    if (this.rate_value > 0 && this.rate_text) {
      this.consultGameReviews(true);
      this.consultUserReviews(true);
    } else {
      this.modal_message = 'Por favor, dê sua nota e faça um comentário para enviar sua avaliação.';
      this.is_message_modal_open = true;
    }
  }

  getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${this.rate_labels[value as keyof typeof this.rate_labels]}`;
  }

  consultUserReviews(isNewReview: boolean) {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/user/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/user/consult';

    this.http.post(fetchURL, { user_username: this.user_username }).subscribe((response: any) => {
      if (response.length === 0) {
        if (isNewReview) {
          this.registerUserReview();
        }
      } else {
        this.user_all_reviews = response[0].user_reviews;
        if (isNewReview) {
          this.updateUserReviews(false);
        }
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  registerUserReview() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/review/user/register'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/review/user/register';

    const feacthBody = {
      user_username: this.user_username,
      user_reviews: [
        {
          game_name: this.game_name,
          game_category: this.game_category,
        },
      ],
      user_reviews_likes: [],
    };

    this.http.post(fetchURL, feacthBody).subscribe((response: any) => {
      if (response.acknowledged) {
        // console.log("Registro do primeiro review (user)", response.data)
      } else {
        // console.log("Erro inesperado, registro de user review!")
      }
    }), () => {
      // console.log("Erro inesperado, registro de user review!")
    };
  }

  updateUserReviews(isDeleteReview: boolean) {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/user/update'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/user/update';

    let userReviewsUpdated = this.user_all_reviews;

    if (isDeleteReview) {
      let indexUserReview;
      let userReview = userReviewsUpdated.find((review: any, index: number) => {
        indexUserReview = index;
        return review.game_name === this.game_name;
      });
      if (userReview) {
        userReviewsUpdated.splice(indexUserReview, 1);
      }
    } else {
      userReviewsUpdated.push({
        game_name: this.game_name,
        game_category: this.game_category,
      });
    }

    this.http.post(fetchURL, {
      user_query: { user_username: this.user_username },
      user_reviews_updated: {
        user_username: this.user_username,
        user_reviews: userReviewsUpdated,
        user_reviews_likes: [],
      },
    }).subscribe((response: any) => {
      if (response.acknowledged) {
        // console.log("Update user reviews", response.data)
      } else {
        // console.log("Erro inesperado, update de user review!")
      }
    }), () => {
      // console.log("Erro inesperado, update de user review!")
    };
  }

  consultGameReviews(isNewReview: boolean) {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/game/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/game/consult';

    this.http.post(fetchURL, { game_name: this.game_name }).subscribe((response: any) => {
      console.log("consultGameReviews", response)
      if (response.length === 0) {
        if (isNewReview) {
          this.registerGameReview();
        } else {
          this.displayGameOverall();
        }
      } else {
        this.game_reviews = response[0].game_reviews.reverse();
        this.getUserReview();
        if (isNewReview) {
          this.updateGameReviews();
        } else {
          this.displayGameOverall();
        }
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  registerGameReview() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/review/game/register'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/review/game/register';

    const feacthBody = {
      game_name: this.game_name,
      game_reviews: [
        {
          user_username: this.user_username,
          user_full_name: this.user_full_name,
          game_rating: this.rate_value,
          game_review: this.rate_text,
        },
      ],
    };

    this.http.post(fetchURL, feacthBody).subscribe((response: any) => {
      if (response.acknowledged) {
        this.displayGameOverall();
        this.is_loader_open = false;
        this.modal_message = 'Jogo avaliado com sucesso!';
        this.is_message_modal_open = true;
        this.cleanRate();
        this.consultGameReviews(false);
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.is_message_modal_open = true;
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  updateGameReviews() {
    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/game/update'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/game/update';

    let gameReviewsUpdated = this.game_reviews;

    gameReviewsUpdated.push({
      user_username: this.user_username,
      user_full_name: this.user_full_name,
      game_rating: this.rate_value,
      game_review: this.rate_text,
    });

    this.http.post(fetchURL, {
      game_query: { game_name: this.game_name },
      game_reviews_updated: {
        game_name: this.game_name,
        game_reviews: gameReviewsUpdated,
      },
    }).subscribe((response: any) => {
      if (response.acknowledged) {
        this.consultGameReviews(false);
        this.is_loader_open = false;
        this.modal_message = 'Jogo avaliado com sucesso!';
        this.is_message_modal_open = true;
        this.cleanRate();
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.is_message_modal_open = true;
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  rateGame() {
    if (this.handleLogin()) {
      this.is_rate_form_open = true;
    } else {
      this.modal_message = 'Faça login ou cadastre-se para poder avaliar os jogos.';
      this.is_message_modal_open = true;
    }
  }

  getUserReview() {
    if (this.handleLogin() && this.game_reviews && this.game_reviews.length >= 1) {
      let indexUserReview;
      let userReview = this.game_reviews.find((review: any, index: number) => {
        indexUserReview = index;
        return review.user_username === this.user_username;
      });
      if (userReview) {
        this.game_reviews.splice(indexUserReview, 1);
        this.user_review = userReview;
      }
    }
  }

  editReview() {
    this.is_rate_form_open = true;
    this.rate_value = this.user_review.game_rating;
    this.rate_hover = -1;
    this.rate_text = this.user_review.game_review;
  }

  deleteReview() {
    this.modal_delete_review_message = '';
    this.is_delete_review_modal_open = false;
    this.is_loader_open = true;

    const host = window.location.hostname;
    let fetchURL = host === 'localhost'
      ? 'http://localhost:8080/reviews/game/update'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/reviews/game/update';

    this.http.post(fetchURL, {
      game_query: { game_name: this.game_name },
      game_reviews_updated: {
        game_name: this.game_name,
        game_reviews: this.game_reviews,
      },
    }).subscribe((response: any) => {
      if (response.acknowledged) {
        this.updateUserReviews(true);
        this.displayGameOverall();
        this.is_loader_open = false;
        this.modal_message = 'Avaliação excluída com sucesso!';
        this.is_message_modal_open = true;
        this.cleanRate();
        this.user_review = undefined;
        this.game_reviews = undefined;
        this.consultGameReviews(false);
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, tente novamente!';
        this.is_message_modal_open = true;
      }
    }), () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    };
  }

  warningDelete() {
    this.modal_delete_review_message = 'Realmente deseja excluir sua avaliação?';
    this.is_delete_review_modal_open = true;
  }
}