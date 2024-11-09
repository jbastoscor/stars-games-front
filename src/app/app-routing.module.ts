import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { AdmComponent } from './views/adm/adm.component';
import { SignInSignUpPageComponent } from './views/sign-in-sign-up-page/sign-in-sign-up-page.component';
import { ProfileComponent } from './views/profile/profile.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { CategoryGamesPageComponent } from './views/category-games-page/category-games-page.component';
import { GameComponent } from './views/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'adm',
    component: AdmComponent
  },
  {
    path: 'login',
    component: SignInSignUpPageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'category',
    component: CategoryGamesPageComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
