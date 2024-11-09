import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameRating: number = 0;

  setGameRating(value: number): void {
    this.gameRating = value;
  }
}