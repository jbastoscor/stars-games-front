import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gameBkp } from '../../utils/gameBanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.scss']
})
export class BannerHomeComponent implements OnInit {
  game_id: string | undefined;
  game_name: string = 'Apple Knight';
  game_category: string = '';
  game_url: string = '';
  game_video_url: string = '';
  game_image_url: string = '';
  game_description: string = '';
  loader_open: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.consultGame();
  }

  navigationToGame(): void {
    this.router.navigate(['/game'], { queryParams: { id: this.game_id } });
  }

  consultGame(): void {
    const host = window.location.hostname;
    const fetchURL =
      host === 'localhost'
        ? 'http://localhost:8080/game/consult'
        : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/game/consult';

    this.http.post(fetchURL, { game_name: this.game_name }).subscribe((response: any) => {
      if (response.status === 200 && response.statusText === 'OK') {
        const data = response.body;
        if (data.length === 1) {
          this.loader_open = false;
          this.game_id = data[0]._id;
          this.game_category = data[0].game_category;
          this.game_url = data[0].game_url;
          this.game_video_url = data[0].game_video_url;
          this.game_image_url = data[0].game_image_url;
          this.game_description = data[0].game_description;
        } else if (data.length === 0) {
          this.loader_open = false;
          this.setBackupGameData();
        }
      } else {
        this.loader_open = false;
        this.setBackupGameData();
      }
    });
  }

  setBackupGameData(): void {
    this.game_id = gameBkp.game._id;
    this.game_category = gameBkp.game.game_category;
    this.game_url = gameBkp.game.game_url;
    this.game_video_url = gameBkp.game.game_video_url;
    this.game_image_url = gameBkp.game.game_image_url;
    this.game_description = gameBkp.game.game_description;
  }
}